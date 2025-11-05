


// import { GoogleGenAI } from "@google/genai";
import { Kpi, ChatMessage } from "../App.tsx";
import { AnalysisData } from "../components/KpiCard.tsx";
import { ReportData } from '../services/reportService.ts';

// --- ДЕМОНСТРАЦИОННЫЙ РЕЖИМ ---
// Все вызовы к API Gemini заменены на заглушки, возвращающие 
// демонстрационные данные с небольшой задержкой для имитации сетевого запроса.
// Это позволяет приложению работать без реального API-ключа.

const demoLog = (functionName: string, prompt: any) => {
    console.log(`⚙️ DEMO MODE: Gemini API call skipped in ${functionName}.`);
    console.log(`   Prompt context:`, prompt);
}

export async function generateKpiConcept(businessGoal: string): Promise<string> {
  demoLog('generateKpiConcept', { businessGoal });
  await new Promise(r => setTimeout(r, 500));
  return `### АРХИТЕКТУРНОЕ РЕШЕНИЕ
Это демонстрационное архитектурное решение. Настоящие ответы появятся после подключения API-ключа.

### ПОЛЬЗОВАТЕЛЬСКИЕ СЦЕНАРИИ
- Это демонстрационный пользовательский сценарий. API отключен.`;
}


export async function generateTz(businessGoal: string, architecture: string, scenarios: string): Promise<string> {
    demoLog('generateTz', { businessGoal, architecture, scenarios });
    await new Promise(r => setTimeout(r, 800));
    return `# Техническое задание: MVP Аналитической системы KPI (Демо)
    
## 1. Введение
Это демонстрационное техническое задание. Функции AI отключены.
    
## 2. Функциональные требования
- **FR-1:** Демонстрационное требование.`;
}

export interface AiAnalysisInput {
    kpiName: string;
    trendDescription: string;
    forecast: string;
    drivers: string[];
}

export async function generateAiAnalysis(input: AiAnalysisInput): Promise<string> {
    demoLog('generateAiAnalysis', input);
    await new Promise(r => setTimeout(r, 500));
    return `### ОБЩАЯ ОЦЕНКА
Это демонстрационная оценка для "${input.kpiName}". API отключен.

### РЕКОМЕНДАЦИИ
- **Демо-рекомендация:** Проверьте подключение API-ключа для получения реальных данных.`;
}

export interface ChatInput {
    kpi: Kpi;
    initialAnalysis: AnalysisData;
    chatHistory: ChatMessage[];
    newUserQuestion: string;
}

export async function generateChatResponse(input: ChatInput): Promise<string> {
    demoLog('generateChatResponse', input);
    await new Promise(r => setTimeout(r, 500));
    return `Это демонстрационный ответ для запроса: "${input.newUserQuestion}". 
Реальные ответы появятся после подключения настоящего API-ключа.`;
}


export async function* generateChatResponseStream(input: ChatInput): AsyncGenerator<string> {
    demoLog('generateChatResponseStream', input);
    const response = `Это демонстрационный потоковый ответ. API отключен. `;
    for (const word of response.split(' ')) {
        await new Promise(r => setTimeout(r, 50));
        yield word + ' ';
    }
}

export interface AssistantContext {
    user: {
        firstName: string;
        lastName: string;
        role: string;
    };
    activitySummary: {
        label: string;
        value: string;
        change: number;
    }[];
}

export async function* generateAssistantResponseStream(
    chatHistory: ChatMessage[], 
    context: AssistantContext
): AsyncGenerator<string> {
    demoLog('generateAssistantResponseStream', { chatHistory, context });
    const response = `Здравствуйте, ${context.user.firstName}! Это демонстрационный ответ. API отключен. `;
     for (const word of response.split(' ')) {
        await new Promise(r => setTimeout(r, 50));
        yield word + ' ';
    }
}

export interface OverallAnalysisInput {
    kpis: {
        title: string;
        value: string;
        change: number;
        changeType: string;
        trendDescription: string;
    }[];
    period: string;
}

export async function generateOverallAnalysis(input: OverallAnalysisInput): Promise<string> {
    demoLog('generateOverallAnalysis', input);
    await new Promise(r => setTimeout(r, 800));
    return `# Сводный Аналитический Отчет (Демо)

## 1. Общая оценка ситуации
Это демонстрационная общая оценка. API отключен.

## 2. Ключевые взаимосвязи и инсайты
Это демонстрационный инсайт.

## 3. Стратегические рекомендации
- Демонстрационная рекомендация.`;
}

export interface OverallChatInput {
    kpis: Pick<Kpi, 'title' | 'value' | 'change'>[];
    period: string;
    initialAnalysis: string;
    chatHistory: ChatMessage[];
    newUserQuestion: string;
}

export async function* generateOverallChatResponseStream(input: OverallChatInput): AsyncGenerator<string> {
    demoLog('generateOverallChatResponseStream', input);
    const response = `Это демонстрационный ответ на общий вопрос. API отключен. `;
    for (const word of response.split(' ')) {
        await new Promise(r => setTimeout(r, 50));
        yield word + ' ';
    }
}

export async function generateDeepDiveAnalysis(kpiName: string, data: number[], period: string): Promise<string> {
    demoLog('generateDeepDiveAnalysis', { kpiName, data, period });
    await new Promise(r => setTimeout(r, 600));
    return `### Ключевые наблюдения
Это демонстрационное наблюдение для "${kpiName}".

### Рекомендации
- Демонстрационная рекомендация.`;
}

export async function generateCorrelationAnalysis(kpi1Name: string, kpi2Name: string, correlation: number): Promise<string> {
    demoLog('generateCorrelationAnalysis', { kpi1Name, kpi2Name, correlation });
    await new Promise(r => setTimeout(r, 500));
    return `Это демонстрационная интерпретация корреляции (${correlation.toFixed(2)}) между "${kpi1Name}" и "${kpi2Name}". API отключен.`;
}

export interface CorrelationChatInput {
    kpi1: Kpi;
    kpi2: Kpi;
    correlation: number;
    initialAnalysis: string;
    chatHistory: ChatMessage[];
    newUserQuestion: string;
}

export async function* generateCorrelationChatResponseStream(input: CorrelationChatInput): AsyncGenerator<string> {
    demoLog('generateCorrelationChatResponseStream', input);
    const response = `Это демонстрационный ответ на вопрос по корреляции. API отключен. `;
    for (const word of response.split(' ')) {
        await new Promise(r => setTimeout(r, 50));
        yield word + ' ';
    }
}

export interface ReportAnalysisInput {
    kpis: {
        label: string;
        value: string | number;
        change: string;
    }[];
    period: string;
}

export async function generateReportAnalysis(input: ReportAnalysisInput): Promise<string> {
    demoLog('generateReportAnalysis', input);
    await new Promise(r => setTimeout(r, 700));
    return `### Краткая сводка
Это демонстрационная сводка для отчета. API отключен.

### Ключевые инсайты
Демонстрационный инсайт.

### Рекомендации
- Демонстрационная рекомендация.`;
}


export interface ReportChatInput {
    reportData: ReportData;
    period: string;
    initialAnalysis: string;
    chatHistory: ChatMessage[];
    newUserQuestion: string;
}


export async function* generateReportChatResponseStream(input: ReportChatInput): AsyncGenerator<string> {
    demoLog('generateReportChatResponseStream', input);
    const response = `Это демонстрационный ответ на вопрос по отчету. API отключен. `;
     for (const word of response.split(' ')) {
        await new Promise(r => setTimeout(r, 50));
        yield word + ' ';
    }
}
