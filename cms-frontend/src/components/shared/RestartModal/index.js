import Modal from 'react-modal';
import { FaSpinner } from 'react-icons/fa';

const RestartModal = ({ isOpen }) => {
    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Restarting server"
            className="flex items-center justify-center h-screen"
            overlayClassName="fixed inset-0 bg-gray-500 opacity-75"
        >
            <div className="bg-white p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Restarting server</h2>
                <FaSpinner className="spin text-blue-500 text-4xl mx-auto" />
            </div>
        </Modal>
    );
};

export default RestartModal;
