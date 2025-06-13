import React, { useState } from 'react';
import { auth, db } from '../service/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { supportedPlatforms } from '../constants/platform';
import './UserForm.scss';

const UserForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [socialLinks, setSocialLinks] = useState<string[]>(['', '', '']);
    const [showNameModal, setShowNameModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleSocialLinkChange = (index: number, value: string) => {
        const newLinks = [...socialLinks];
        newLinks[index] = value;
        setSocialLinks(newLinks);
    };

    const handleAddLink = () => setSocialLinks([...socialLinks, '']);
    const handleRemoveLink = (index: number) => setSocialLinks(socialLinks.filter((_, i) => i !== index));

    const handleRegister = async () => {
        try {
            if (!email || !password) {
                throw new Error("Email e senha são obrigatórios.");
            }
    
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            const socials: { [key: string]: string } = { name };
            socialLinks
                .filter(link => link.trim() !== '')
                .forEach(link => {
                    const platform = supportedPlatforms.find(p => link.includes(p.identifier));
                    socials[platform?.name || `outros${Object.keys(socials).length}`] = link;
                });
    
            await setDoc(doc(db, "name", user.uid), socials);
            navigate(`/user/${user.uid}`);
        } catch (error: any) {
            console.error("Erro ao criar usuário:", error.message);
            setErrorMessage(error.message || "Erro ao criar usuário.");
        }
    };

    const loginWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDocSnap = await getDoc(doc(db, "name", user.uid));
            if (userDocSnap.exists()) {
                navigate(`/user/${user.uid}`);
            } else {
                setErrorMessage('Usuário não cadastrado. Por favor, registre-se antes de fazer login.');
            }
        } catch (error) {
            setErrorMessage('Erro no login. Verifique suas credenciais.');
        }
    };

    const loginWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = userCredential.user;

            const userDocSnap = await getDoc(doc(db, "name", user.uid));
            if (!userDocSnap.exists()) {
                setShowNameModal(true);
            } else {
                navigate(`/user/${user.uid}`);
            }
        } catch (error) {
            setErrorMessage('Erro no login com Google. Tente novamente.');
        }
    };

    const handleSaveName = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "name", user.uid), { name });
                setShowNameModal(false);
                navigate(`/user/${user.uid}`);
            }
        } catch (error) {
            console.error("Erro ao salvar o nome do usuário:", error);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={(e) => {
                e.preventDefault();
                if (isRegistering) {
                    handleRegister();
                } else {
                    loginWithEmail(e);
                }
            }}>
                <h2>{isRegistering ? 'Cadastro' : 'Login'}</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {isRegistering && (
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        <button type="button" className="submit-btn" onClick={handleAddLink}>
                            Adicionar link
                        </button>
                    </>
                )}
                <button type="submit" className="submit-btn">
                    {isRegistering ? 'Cadastrar' : 'Login'}
                </button>
                <button type="button" className="google-login" onClick={loginWithGoogle}>
                    <img src="https://img.icons8.com/?size=512&id=17949&format=png" alt="Login com Google" />
                    <span>Entrar com Google</span>
                </button>
                <p onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: 'pointer', marginTop: '1em' }}>
                    {isRegistering ? 'Já tem conta? Fazer Login' : 'Não tem conta? Cadastrar'}
                </p>
            </form>
            {showNameModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <h2>Digite seu nome</h2>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="modal-actions">
                            <button className="submit-btn" onClick={handleSaveName}>
                                Salvar
                            </button>
                            <button className="cancel-btn" onClick={() => setShowNameModal(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserForm;
