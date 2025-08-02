import { DocSection } from '../section/DocSection';
import type { Article } from '../../models/Articles';
import { DocCode } from '../section/types/DocCode';
import { TextFormatting } from '../../services/TextFormatting';

export const DocArticle = ({ id, title, elements }: Article) => {
    const formater = new TextFormatting();
    return (
        <DocSection id={id}>
            <h2>
                {title}
            </h2>
            {
                elements.map((item, index) => {
                    switch (item.type) {
                        case "text":
                            return <div key={index} dangerouslySetInnerHTML={{
                                __html: formater.formatText(item.content)
                            }}></div>;
                        case "code":
                            return <DocCode key={index} code={item.content} />;
                        case "image":
                            return <img key={index} src={item.content} style={{
                                width: "100%",
                                borderRadius: "8px",
                                margin: "16px 0"
                            }} alt="Documentation Image" className="docs-image" />;
                        default:
                            return null;
                    }
                })
            }
        </DocSection>
    )
}
