import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PageComponent: React.FC = () => {
    const { pageName } = useParams<{ pageName: string }>();
    const [pageContent, setPageContent] = useState<{ title: string; content: string } | null>(null);

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                const response = await axios.get(`https://emil-mamanov-js-20-pages-default-rtdb.europe-west1.firebasedatabase.app/pages/${pageName}.json`);
                setPageContent(response.data);
            } catch (error) {
                console.error('Error fetching page content:', error);
            }
        };

        (async () => {
            await fetchPageContent();
        })();
    }, [pageName]);

    if (!pageContent) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{pageContent.title}</h1>
            <p>{pageContent.content}</p>
        </div>
    );
};

export default PageComponent;