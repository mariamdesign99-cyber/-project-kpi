import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
    DatabaseIcon, FileUpIcon, TypeIcon, ClockIcon, XIcon, CheckCircle2Icon, XCircleIcon, HistoryIcon 
} from './icons.tsx';

type DataSource = 'api' | 'file' | 'manual';
type Schedule = 'hourly' | 'daily' | 'manual';
type UploadStatus = 'idle' | 'success' | 'error';
type ModalView = 'select' | 'preview' | 'processing' | 'result' | 'log';

interface ImportLogEntry {
    date: Date;
    fileName: string;
    status: 'success' | 'error';
    newRecords?: number;
    updatedRecords?: number;
}

interface DataUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (settings: { source: DataSource; schedule?: Schedule, manualData?: Record<string, string> }) => void;
}

const EXPECTED_HEADERS = ['id', 'date', 'value', 'kpi_name'];

export const DataUpdateModal: React.FC<DataUpdateModalProps> = ({ isOpen, onClose, onSave }) => {
    const [activeTab, setActiveTab] = useState<DataSource>('file');
    const [schedule, setSchedule] = useState<Schedule>('daily');
    const [isDragging, setIsDragging] = useState(false);
    const [manualInput, setManualInput] = useState('revenue: 1.3M ₽\nsales: 9,102');

    // State for file handling and views
    const [view, setView] = useState<ModalView>('select');
    const [previewData, setPreviewData] = useState<{ headers: string[], rows: string[][] } | null>(null);
    const [validationErrors, setValidationErrors] = useState<{ missingHeaders: string[], invalidCells: { row: number, colIndex: number }[] } | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [processedFileData, setProcessedFileData] = useState<Record<string, string> | null>(null);
    
    // State for upload process
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
    const [importLog, setImportLog] = useState<ImportLogEntry[]>([]);
    const [lastImportResult, setLastImportResult] = useState<{ newRecords: number, updatedRecords: number } | null>(null);

    const progressIntervalRef = useRef<number | null>(null);

    // Effect to clean up interval on unmount or when processing finishes
    useEffect(() => {
        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, []);

    const resetStateAndClose = useCallback(() => {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setActiveTab('file');
        setSchedule('daily');
        setIsDragging(false);
        setManualInput('revenue: 1.3M ₽\nsales: 9,102');
        setView('select');
        setPreviewData(null);
        setValidationErrors(null);
        setFileName(null);
        setProcessedFileData(null);
        setUploadProgress(0);
        setUploadStatus('idle');
        onClose();
    }, [onClose]);

    if (!isOpen) {
        return null;
    }

    // A placeholder UI since the original was truncated.
    return (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg">
                <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold">Обновление данных</h2>
                    <button onClick={resetStateAndClose}>
                        <XIcon className="w-6 h-6" />
                    </button>
                </header>
                <div className="p-6">
                    <p>Содержимое модального окна было усечено. Это заполнитель для исправления ошибки компиляции.</p>
                </div>
                <footer className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button onClick={resetStateAndClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">Закрыть</button>
                </footer>
            </div>
        </div>
    );
};