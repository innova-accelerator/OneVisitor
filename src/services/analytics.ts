import api from './api';

interface TimeFrame {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    granularity: string;
}

interface PageAnalytics {
    id: string;
    time_frame: TimeFrame;
    page_view: {
        id: string;
        url: string;
        title: string;
    };
    total_views: number;
    unique_visitors: number;
    average_time_on_page: string;
    bounce_rate: number;
    conversion_rate: number;
}

interface UserBehavior {
    id: string;
    visitor: {
        id: string;
        ip_address: string;
    };
    time_frame: TimeFrame;
    average_session_duration: string;
    pages_per_session: number;
    return_rate: number;
    engagement_score: number;
}

interface Conversion {
    id: string;
    visitor: {
        id: string;
        ip_address: string;
    };
    conversion_type: string;
    value: number;
    timestamp: string;
    metadata: Record<string, unknown>;
}

interface Report {
    id: string;
    name: string;
    description: string;
    report_type: 'visitor' | 'page' | 'conversion' | 'custom';
    time_frame: TimeFrame;
    data: Record<string, unknown>;
    created_by: {
        id: number;
        email: string;
    };
    last_generated: string;
}

interface Metric {
    id: string;
    name: string;
    description: string;
    formula: string;
    unit: string;
    is_active: boolean;
}

// Time frame management
export const getTimeFrames = async (): Promise<TimeFrame[]> => {
    const response = await api.get<TimeFrame[]>('/analytics/time-frames/');
    return response.data;
};

export const createTimeFrame = async (data: {
    name: string;
    start_date: string;
    end_date: string;
    granularity: string;
}): Promise<TimeFrame> => {
    const response = await api.post<TimeFrame>('/analytics/time-frames/', data);
    return response.data;
};

// Page analytics
export const getPageAnalytics = async (params: {
    time_frame?: string;
    start_date?: string;
    end_date?: string;
}): Promise<PageAnalytics[]> => {
    const response = await api.get<PageAnalytics[]>('/analytics/page-analytics/', { params });
    return response.data;
};

export const getPageAnalyticsAggregation = async (params: {
    time_frame: string;
    start_date?: string;
    end_date?: string;
}): Promise<Array<{
    period: string;
    total_views: number;
    unique_visitors: number;
    avg_time: number;
    bounce_rate: number;
    conversion_rate: number;
}>> => {
    const response = await api.get('/analytics/page-analytics/aggregate/', { params });
    return response.data;
};

// User behavior
export const getUserBehavior = async (params: {
    time_frame?: string;
    start_date?: string;
    end_date?: string;
}): Promise<UserBehavior[]> => {
    const response = await api.get<UserBehavior[]>('/analytics/user-behavior/', { params });
    return response.data;
};

export const getEngagementMetrics = async (params: {
    time_frame?: string;
    start_date?: string;
    end_date?: string;
}): Promise<{
    avg_session_duration: string;
    avg_pages_per_session: number;
    avg_return_rate: number;
    avg_engagement_score: number;
}> => {
    const response = await api.get('/analytics/user-behavior/engagement-metrics/', { params });
    return response.data;
};

// Conversions
export const getConversions = async (params: {
    time_frame?: string;
    start_date?: string;
    end_date?: string;
}): Promise<Conversion[]> => {
    const response = await api.get<Conversion[]>('/analytics/conversions/', { params });
    return response.data;
};

export const getConversionMetrics = async (params: {
    time_frame?: string;
    start_date?: string;
    end_date?: string;
}): Promise<Array<{
    conversion_type: string;
    count: number;
    total_value: number;
}>> => {
    const response = await api.get('/analytics/conversions/conversion-metrics/', { params });
    return response.data;
};

// Reports
export const getReports = async (): Promise<Report[]> => {
    const response = await api.get<Report[]>('/analytics/reports/');
    return response.data;
};

export const createReport = async (data: {
    name: string;
    description: string;
    report_type: 'visitor' | 'page' | 'conversion' | 'custom';
    time_frame: string;
    data?: Record<string, unknown>;
}): Promise<Report> => {
    const response = await api.post<Report>('/analytics/reports/', data);
    return response.data;
};

export const generateReport = async (reportId: string): Promise<Report> => {
    const response = await api.post<Report>(`/analytics/reports/${reportId}/generate/`);
    return response.data;
};

// Metrics
export const getMetrics = async (): Promise<Metric[]> => {
    const response = await api.get<Metric[]>('/analytics/metrics/');
    return response.data;
};

export const createMetric = async (data: {
    name: string;
    description: string;
    formula: string;
    unit: string;
}): Promise<Metric> => {
    const response = await api.post<Metric>('/analytics/metrics/', data);
    return response.data;
};

// Analytics summary
export const getAnalyticsSummary = async (params: {
    time_frame?: string;
    start_date?: string;
    end_date?: string;
}): Promise<{
    time_frame: string;
    start_date: string;
    end_date: string;
    visitor_metrics: {
        total_visitors: number;
        new_visitors: number;
        returning_visitors: number;
    };
    page_metrics: {
        total_views: number;
        avg_duration: string;
        bounce_rate: number;
    };
    conversion_metrics: {
        total_conversions: number;
        conversion_value: number;
    };
}> => {
    const response = await api.get('/analytics/summary/', { params });
    return response.data;
}; 