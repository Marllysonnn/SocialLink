import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, auth } from "../service/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import Cards from "../components/cards";
import Modal from "../components/modal";
import './principal.scss';

const supportedPlatforms = [
    { name: 'facebook', identifier: 'facebook.com' },
    { name: 'instagram', identifier: 'instagram.com' },
    { name: 'tiktok', identifier: 'tiktok.com' },
    { name: 'twitter', identifier: 'twitter.com' },
    { name: 'x', identifier: 'x.com' },
    { name: 'linkedin', identifier: 'linkedin.com' },
    { name: 'youtube', identifier: 'youtube.com' },
    { name: 'github', identifier: 'github.com' },
    { name: 'pinterest', identifier: 'pinterest.com' },
    { name: 'whatsapp', identifier: 'whatsapp.com' },
    { name: 'snapchat', identifier: 'snapchat.com' },
    { name: 'reddit', identifier: 'reddit.com' },
    { name: 'tumblr', identifier: 'tumblr.com' },
    { name: 'vimeo', identifier: 'vimeo.com' },
    { name: 'discord', identifier: 'discord.com' },
    { name: 'telegram', identifier: 'telegram.org' },
    { name: 'twitch', identifier: 'twitch.tv' },
    { name: 'outros', identifier: '' }
];

interface SocialLinks {
    [key: string]: string;
}

const Principal = () => {
    const { uid } = useParams<{ uid: string }>();
    const [socialLinks, setSocialLinks] = useState<SocialLinks>({});
    const [userName, setUserName] = useState<string>('Usuário');
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!uid) {
                console.error("UID is undefined.");
                return;
            }
            const docSnap = await getDoc(doc(db, "name", uid));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setSocialLinks(userData);
                setUserName(userData.name || 'Usuário');
            } else {
                console.log("Nenhum documento encontrado para o usuário!");
            }
            setLoading(false);
        };

        fetchUserData();

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user && user.uid === uid);
        });

        return () => unsubscribe();
    }, [uid]);

    const handleAddLink = async (link: string) => {
        if (!uid) return console.error("UID is undefined.");
        const platform = supportedPlatforms.find(p => link.includes(p.identifier));
        const platformName = platform?.name || `outros${Object.keys(socialLinks).length}`;
        const updatedLinks = { ...socialLinks, [platformName]: link };
        await updateDoc(doc(db, "name", uid), updatedLinks);
        setSocialLinks(updatedLinks);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            navigate("/");
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;
    return (
        <div className="App">
            <h2>{userName}</h2>
            <div className="card-content">
                {Object.entries(socialLinks)
                    .filter(([key]) => key !== "name")
                    .map(([key, link]) => (
                        <Cards key={key} link={link} name={key.charAt(0).toUpperCase() + key.slice(1)} />
                    ))}
            </div>
            {isLoggedIn ? (
                <>
                    <button className="submit-btn-link" onClick={() => setIsModalOpen(true)}>
                        Adicionar Link
                    </button>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleAddLink}
                    />
                    <button className="logout-btn-link" onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <button className="submit-btn-link" onClick={() => navigate("/")}>
                    Fazer Login
                </button>
            )}
        </div>
    );
};

export default Principal;