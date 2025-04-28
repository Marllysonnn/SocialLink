import React, { useState } from 'react';
import { auth, db } from '../service/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './UserForm.scss';

const UserForm: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [socialLinks, setSocialLinks] = useState<string[]>(['', '', '']);
    const navigate = useNavigate();

    const handleSocialLinkChange = (index: number, value: string) => {
        const newLinks = [...socialLinks];
        newLinks[index] = value;
        setSocialLinks(newLinks);
    };

    const handleAddLink = () => {
        setSocialLinks([...socialLinks, '']);
    };

    const handleRemoveLink = (index: number) => {
        const newLinks = [...socialLinks];
        newLinks.splice(index, 1);
        setSocialLinks(newLinks);
    };

    const loginWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isRegistering) {
            await handleRegister(email, password);
        } else {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                console.log('Login com email feito!');

                const user = auth.currentUser;
                if (user) {
                    navigate(`/user/${user.uid}`);
                }
            } catch (error: any) {
                console.error('Erro no login:', error.message);
            }
        }
    };

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            console.log('Login com Google feito!');

            const user = auth.currentUser;
            if (user) {
                navigate(`/user/${user.uid}`);
            }
        } catch (error: any) {
            console.error('Erro no login com Google:', error.message);
        }
    };

    async function handleRegister(email: string, password: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDoc = doc(db, "name", user.uid);

            const socials: { [key: string]: string } = {};

            socialLinks.forEach(link => {
                if (link.includes("facebook.com")) socials.facebook = link;
                else if (link.includes("instagram.com")) socials.instagram = link;
                else if (link.includes("tiktok.com")) socials.tiktok = link;
                else if (link.includes("name")) socials.name = link;
                else if (link.includes("twitter.com") || link.includes("x.com")) socials.twitter = link;
                else socials.outros = link;
            });

            await setDoc(userDoc, socials);

            console.log("Usuário e redes sociais criados com sucesso!");
            navigate('/user/:uid'); // 👈 Aqui!
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log('Usuário logado:', user);


                const userDocRef = doc(db, "name", user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    console.log('Dados da conta:', userDocSnap.data());
                } else {
                    console.log('Nenhum dado encontrado para o usuário.');
                }
            } else {
                console.log('Usuário deslogado');
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="form-container">
            <form onSubmit={loginWithEmail}>
                <h2>{isRegistering ? 'Cadastro' : 'Login'}</h2>

                {isRegistering && (
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {isRegistering && (
                    <>
                        <h3>Redes Sociais</h3>
                        <div id="social-links">
                            {socialLinks.map((link, index) => (
                                <div className="social-link-item" key={index}>
                                    <input
                                        type="url"
                                        value={link}
                                        onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                                        placeholder="Link da rede social"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="remove-link-btn"
                                        onClick={() => handleRemoveLink(index)}
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button type="button" id="add-link-btn" onClick={handleAddLink}>
                            + Adicionar link
                        </button>
                    </>
                )}

                <button type="submit" className="submit-btn">
                    {isRegistering ? 'Cadastrar' : 'Login'}
                </button>

                <button type="button" className="google-login" onClick={loginWithGoogle}>
                    <img src="src/assets/img/google.png" alt="Login com Google" />
                    <span>Entrar com Google</span>
                </button>

                <p onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: 'pointer', marginTop: '1em' }}>
                    {isRegistering ? 'Já tem conta? Fazer Login' : 'Não tem conta? Cadastrar'}
                </p>
            </form>
        </div>
    );
};

export default UserForm;
