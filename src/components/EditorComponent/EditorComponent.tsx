import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface EditorProps {
    selectedPage: string;
    setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
}

const EditorComponent: React.FC<EditorProps> = ({ selectedPage, setSelectedPage }) => {
    const [pageContent, setPageContent] = useState<{ title: string; content: string } | null>(null);
    const [availablePages, setAvailablePages] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvailablePages = async () => {
            try {
                const response = await axios.get('https://emil-mamanov-js-20-pages-default-rtdb.europe-west1.firebasedatabase.app/pages.json');
                const pages = response.data;
                setAvailablePages(Object.keys(pages));
            } catch (error) {
                console.error('Error fetching available pages:', error);
            }
        };

        (async () => {
            await fetchAvailablePages();
        })();
    }, []);

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                const response = await axios.get(`https://emil-mamanov-js-20-pages-default-rtdb.europe-west1.firebasedatabase.app/pages/${selectedPage}.json`);
                setPageContent(response.data);
            } catch (error) {
                console.error('Error fetching page content:', error);
            }
        };

        (async () => {
            await fetchPageContent();
        })();
    }, [selectedPage]);

    const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPage(event.target.value);
    };

    const handleSave = async () => {
        try {
            await axios.put(`https://emil-mamanov-js-20-pages-default-rtdb.europe-west1.firebasedatabase.app/pages/${selectedPage}.json`, pageContent);

            navigate(`/pages/${selectedPage}`);
        } catch (error) {
            console.error('Error saving page content:', error);
        }
    };

    return (
        <div className="editor-form">
            <h2>Edit Page: {selectedPage}</h2>
            <select className="form-control" value={selectedPage || ''} onChange={handlePageChange}>
                <option value="" disabled>Select a page</option>
                {availablePages.map((page) => (
                    <option key={page} value={page}>
                        {page}
                    </option>
                ))}
            </select>
            {!selectedPage ? (
                <div>Please select a page.</div>
            ) : (
                <>
                    {pageContent && (
                        <div>
                            <label>Title:</label>
                            <input
                                className="form-control"
                                type="text"
                                value={pageContent.title || ''}
                                onChange={(e) => setPageContent({ ...pageContent, title: e.target.value })}
                            />
                            <label>Content:</label>
                            <textarea
                                className="form-control-2"
                                value={pageContent.content || ''}
                                onChange={(e) => setPageContent({ ...pageContent, content: e.target.value })}
                            />
                            <button className="btn-save" onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default EditorComponent;
