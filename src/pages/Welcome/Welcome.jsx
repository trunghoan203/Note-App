import logo from './../../assets/image/logo.png';
// import Hoanavt from './../../assets/image/Hoanavt.jpg';

const Welcome = () => {
    return (
        <div className="flex flex-col justify-between items-center min-h-screen bg-customGray">
            <div className="text-center mt-10">
                <img src={logo} alt="MemmoMind Logo" className="w-90" />
            </div>
            <div className="text-center">
                <p className="text-xl">Chào mừng bạn đến với thế giới Note mới cùng MEMMOMIND</p>
                <a href="/login" className="mt-10 inline-block px-6 py-2 bg-customGray font-bold text-black rounded-md text-lg hover:bg-gray-300 underline">
                    Trải nghiệm ngay
                </a>
            </div>
            <footer className="bg-customRedGray w-full text-center p-4">
                <div className="mb-3">
                    <h3>© 2024 Copyright: MemmoMind.com</h3>
                </div>
                <div className="flex justify-center space-x-4">
                    <a href="https://www.facebook.com/yourprofile1" target="_blank" rel="noopener noreferrer">
                        <img src={logo} alt="Avatar 1" className="w-10 h-10 rounded-full hover:opacity-50" />
                    </a>
                    <a href="https://www.facebook.com/yourprofile2" target="_blank" rel="noopener noreferrer">
                        <img src={logo} alt="Avatar 2" className="w-10 h-10 rounded-full hover:opacity-50" />
                    </a>
                    <a href="https://www.facebook.com/yourprofile3" target="_blank" rel="noopener noreferrer">
                        <img src={logo} alt="Avatar 3" className="w-10 h-10 rounded-full hover:opacity-50" />
                    </a>
                    <a href="https://www.facebook.com/yourprofile4" target="_blank" rel="noopener noreferrer">
                        <img src={logo} alt="Avatar 4" className="w-10 h-10 rounded-full hover:opacity-50" />
                    </a>
                    <a href="https://www.facebook.com/yourprofile5" target="_blank" rel="noopener noreferrer">
                        <img src={logo} alt="Avatar 5" className="w-10 h-10 rounded-full hover:opacity-50" />
                    </a>
                    <a href="https://www.facebook.com/yourprofile6" target="_blank" rel="noopener noreferrer">
                        <img src={logo} alt="Avatar 6" className="w-10 h-10 rounded-full hover:opacity-50" />
                    </a>
                </div>
            </footer>

        </div>
    );
};

export default Welcome;
