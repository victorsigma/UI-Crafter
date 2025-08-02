import '../docs-styles.css';
import { DocSlider } from '../components/slider/DocSlider';
import { DocLink } from '../components/slider/types/DocLink';
import { DocButton } from '../components/slider/types/DocButton';
import { useEffect, useState } from 'react';
import { documentation } from '../libs/documetation';
import { DocArticle } from '../components/article/DocArticle';
import { faDoorOpen, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

export const DocumentationView = () => {
    const [theme, setTheme] = useState('dark');

    const [icon, setIcon] = useState(faSun);



    useEffect(() => {
        const savedTheme = localStorage.getItem('docs-theme') || 'dark';
        setTheme(savedTheme);
        setIcon(savedTheme === 'dark' ? faSun : faMoon);


        const handleKeyDown = (e: KeyboardEvent) => {
            const ctrl = e.ctrlKey || e.metaKey;
            const key = e.key.toLowerCase();

            if ("ctrl+q" === `${ctrl ? 'ctrl+' : ''}${key}`) {
                e.preventDefault();
                handleExitDocs();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [])

    const handleThemeChange = () => {
        setTheme(prevTheme => {
            localStorage.setItem("docs-theme", prevTheme === 'dark' ? 'light' : 'dark')
            setIcon(prevTheme === 'dark' ? faMoon : faSun);
            return prevTheme === 'dark' ? 'light' : 'dark'
        });
    }

    const navigate = useNavigate();

    const handleExitDocs = () => {
        navigate("/")
    }


    return (
        <div className='docs-view' data-theme={theme}>
            <DocSlider>
                <DocLink href='#ui-crafter' text='UI Crafter - Documentation' />
                {
                    documentation.map((article) => {
                        return (
                            <DocLink
                                key={article.id}
                                href={`#${article.id}`}
                                text={article.title}
                            />
                        )
                    })
                }

                <DocLink href='/' text='Exit' />
            </DocSlider>

            <main className='docs-content'>
                <div id='ui-crafter' style={{ height: "0px", width: "0px" }}></div>
                <header className='docs-header'>
                    <h1>UI Crafter - Documentación</h1>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <DocButton text="Change theme" icon={icon} onClick={handleThemeChange} />
                        <DocButton text="Exit" icon={faDoorOpen} onClick={handleExitDocs} />
                    </div>
                </header>

                <div className="docs-container">
                    {
                        documentation.map((article) => {
                            return (
                                <DocArticle
                                    key={article.id}
                                    id={article.id}
                                    title={article.title}
                                    elements={article.elements}
                                />
                            )
                        })
                    }
                </div>
            </main>
        </div>
    )
}
