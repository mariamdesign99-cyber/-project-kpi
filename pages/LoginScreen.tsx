import React, { useState } from 'react';
import { BrainCircuitIcon } from '../components/icons.tsx';
import { Loader } from '../components/Loader.tsx';

interface LoginScreenProps {
    onLoginSuccess: () => void;
}

// Пароль для доступа к курсовому проекту
const CORRECT_PASSWORD = 'kpi_project_2024';

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Имитация небольшой задержки для UX
        setTimeout(() => {
            if (password === CORRECT_PASSWORD) {
                onLoginSuccess();
            } else {
                setError('Неверный пароль доступа.');
                setPassword('');
            }
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 animate-fade-in">
                <div className="text-center">
                    <BrainCircuitIcon className="w-16 h-16 mx-auto text-cyan-500 dark:text-cyan-400 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Платформа KPI-Аналитики</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Курсовой проект</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Пароль доступа
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                placeholder="Введите пароль"
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-center text-red-500">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-all"
                        >
                            {isLoading ? <Loader small /> : 'Войти'}
                        </button>
                    </div>
                </form>
                <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                    Это демонстрационный проект. Для доступа используйте пароль, предоставленный автором.
                </p>
            </div>
        </div>
    );
};