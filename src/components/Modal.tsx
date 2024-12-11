import { gamestate } from "./Board";

interface modalProps {
    gameState : gamestate
}

const Modal = ({gameState} : modalProps) => {
    return (
        <div className="fixed  inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    {gameState === 'WIN' && <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"/>}
                    {gameState === 'LOSE' && <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"/>}
                    {gameState === 'WIN' && <h3 className="text-lg leading-6 font-medium text-gray-900 pt-5">You Win!</h3>}
                    {gameState === 'LOSE' && <h3 className="text-lg leading-6 font-medium text-gray-900 pt-5">You Lose...</h3>}
                    <button className="pt-5" onClick={() => window.location.reload()}>Refresh Page</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;

