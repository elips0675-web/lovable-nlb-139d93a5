
import React, { useState, useEffect } from 'react';
import FeedbackForm from '../feedback/FeedbackForm';

const FabWidget: React.FC = () => {
    const [isFabMenuOpen, setFabMenuOpen] = useState(false);
    const [isRequisitesModalOpen, setRequisitesModalOpen] = useState(false);
    const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

    const toggleFabMenu = () => {
        setFabMenuOpen(!isFabMenuOpen);
    };

    const openRequisitesModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setFabMenuOpen(false);
        setRequisitesModalOpen(true);
    };

    const closeRequisitesModal = () => {
        setRequisitesModalOpen(false);
    };

    const openFeedbackModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setFabMenuOpen(false);
        setFeedbackModalOpen(true);
    };

    const closeFeedbackModal = () => {
        setFeedbackModalOpen(false);
    };

    const handleJivoChat = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setFabMenuOpen(false);

        if (typeof (window as any).jivo_api !== 'undefined') {
            (window as any).jivo_api.open();
        } else {
            alert('Чат JivoSite подключен. Для работы необходимо добавить скрипт JivoSite на сайт.\n\nДобавьте этот код перед закрывающим тегом </body>:\n\n<script src="https://code.jivosite.com/widget/XXXXXXX"><\/script>\n\nЗамените XXXXXXX на ваш код виджета JivoSite.');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const fabWidget = document.querySelector('.fab-widget');
            if (fabWidget && !fabWidget.contains(event.target as Node)) {
                setFabMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="fab-widget">
                <button className={`fab-button ${isFabMenuOpen ? 'active' : ''}`} onClick={toggleFabMenu}>
                    <i className="fas fa-comment-alt"></i>
                </button>

                <div className={`fab-menu ${isFabMenuOpen ? 'active' : ''}`}>
                    <a href="https://t.me/your_company" target="_blank" rel="noopener noreferrer" className="fab-item">
                        <span className="fab-label">Telegram Chat</span>
                        <div className="fab-icon telegram"><i className="fab fa-telegram-plane"></i></div>
                    </a>
                    <a href="https://t.me/your_channel" target="_blank" rel="noopener noreferrer" className="fab-item">
                        <span className="fab-label">Наш канал Telegram</span>
                        <div className="fab-icon telegram"><i className="fab fa-telegram"></i></div>
                    </a>
                    <a href="https://wa.me/79991234567" target="_blank" rel="noopener noreferrer" className="fab-item">
                        <span className="fab-label">WhatsApp Chat</span>
                        <div className="fab-icon whatsapp"><i className="fab fa-whatsapp"></i></div>
                    </a>
                    <a href="#" className="fab-item" onClick={handleJivoChat}>
                        <span className="fab-label">Напишите в чат (JivoSite)</span>
                        <div className="fab-icon jivo"><i className="fas fa-headset"></i></div>
                    </a>
                    <a href="https://vk.com/your_group" target="_blank" rel="noopener noreferrer" className="fab-item">
                        <span className="fab-label">Наша группа VK</span>
                        <div className="fab-icon vk"><i className="fab fa-vk"></i></div>
                    </a>
                    <a href="#" className="fab-item" onClick={openFeedbackModal}>
                        <span className="fab-label">Обратная связь</span>
                        <div className="fab-icon form"><i className="fas fa-envelope"></i></div>
                    </a>
                    <a href="viber://chat?number=+79991234567" className="fab-item">
                        <span className="fab-label">Viber Chat</span>
                        <div className="fab-icon viber"><i className="fab fa-viber"></i></div>
                    </a>
                    <a href="mailto:info@example.com" className="fab-item">
                        <span className="fab-label">Написать на Email</span>
                        <div className="fab-icon email"><i className="fas fa-at"></i></div>
                    </a>
                    <a href="#" className="fab-item" onClick={openRequisitesModal}>
                        <span className="fab-label">Наши реквизиты</span>
                        <div className="fab-icon requisites"><i className="fas fa-file-invoice-dollar"></i></div>
                    </a>
                    <a href="tel:+78001234567" className="fab-item">
                        <span className="fab-label">Позвонить нам</span>
                        <div className="fab-icon phone"><i className="fas fa-phone"></i></div>
                    </a>
                </div>
            </div>

            {isRequisitesModalOpen && (
                <div className="modal-overlay active" onClick={closeRequisitesModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Наши реквизиты</h2>
                            <button className="modal-close" onClick={closeRequisitesModal}>&times;</button>
                        </div>
                        <div className="requisites-list">
                            <div className="requisite-item">
                                <div className="requisite-label">Наименование организации</div>
                                <div className="requisite-value">ООО "Ваша Компания"</div>
                            </div>
                            {/* ... other requisite items ... */}
                        </div>
                    </div>
                </div>
            )}

            {isFeedbackModalOpen && (
                <div className="modal-overlay active" onClick={closeFeedbackModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Обратная связь</h2>
                            <button className="modal-close" onClick={closeFeedbackModal}>&times;</button>
                        </div>
                        <FeedbackForm />
                    </div>
                </div>
            )}
        </>
    );
};

export default FabWidget;
