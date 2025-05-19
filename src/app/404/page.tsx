'use client'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';

export default function Custom404() {
    const router = useRouter();
    const { t } = useTranslation('common');

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600">{t('404_title')}</h1>
            <p className="text-gray-600 mt-4">{t('404_description')}</p>
            <button
                onClick={() => router.push('/')}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                {t('go_home')}
            </button>
        </div>
    );
}