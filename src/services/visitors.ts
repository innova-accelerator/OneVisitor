import api from './api';

interface Visitor {
    id: string;
    user?: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
    };
    ip_address: string;
    user_agent: string;
    referrer: string;
    country: string;
    city: string;
    device_type: string;
    browser: string;
    os: string;
    is_authenticated: boolean;
    first_visit: string;
    last_visit: string;
    last_visit_duration: string;
    is_returning: boolean;
}

interface PageView {
    id: string;
    visitor_id: string;
    session_id: string;
    url: string;
    path: string;
    title: string;
    duration: string;
    is_bounce: boolean;
    timestamp: string;
}

interface Session {
    id: string;
    visitor_id: string;
    session_id: string;
    start_time: string;
    end_time: string;
    duration: string;
    page_views_count: number;
    is_active: boolean;
}

interface Event {
    id: string;
    visitor_id: string;
    session_id: string;
    event_type: string;
    element_id: string;
    element_class: string;
    element_text: string;
    metadata: Record<string, any>;
    timestamp: string;
}

interface VisitorAnalytics {
    visitor: Visitor;
    total_sessions: number;
    total_page_views: number;
    total_events: number;
    average_session_duration: string;
    average_pages_per_session: number;
    bounce_rate: number;
    conversion_rate: number;
    last_session: Session;
    top_pages: Array<{
        path: string;
        title: string;
        views: number;
    }>;
    top_events: Array<{
        event_type: string;
        count: number;
    }>;
}

// Visitor tracking
export const trackVisitor = async (): Promise<Visitor> => {
    const response = await api.post<Visitor>('/visitors/track/');
    return response.data;
};

export const updateVisitorLocation = async (
    visitorId: string,
    location: { country: string; city: string }
): Promise<Visitor> => {
    const response = await api.post<Visitor>(`/visitors/${visitorId}/update-location/`, location);
    return response.data;
};

// Page view tracking
export const trackPageView = async (data: {
    visitor_id: string;
    url: string;
    path: string;
    title: string;
    duration?: string;
}): Promise<PageView> => {
    const response = await api.post<PageView>('/page-views/track/', data);
    return response.data;
};

// Session management
export const startSession = async (visitorId: string): Promise<Session> => {
    const response = await api.post<Session>('/sessions/start/', { visitor_id: visitorId });
    return response.data;
};

export const endSession = async (sessionId: string): Promise<Session> => {
    const response = await api.post<Session>(`/sessions/${sessionId}/end/`);
    return response.data;
};

export const addPageViewToSession = async (
    sessionId: string,
    pageViewId: string
): Promise<Session> => {
    const response = await api.post<Session>(`/sessions/${sessionId}/add-page-view/`, {
        page_view_id: pageViewId,
    });
    return response.data;
};

// Event tracking
export const trackEvent = async (data: {
    visitor_id: string;
    session_id: string;
    event_type: string;
    element_id?: string;
    element_class?: string;
    element_text?: string;
    metadata?: Record<string, any>;
}): Promise<Event> => {
    const response = await api.post<Event>('/events/track/', data);
    return response.data;
};

// Analytics
export const getVisitorAnalytics = async (visitorId: string): Promise<VisitorAnalytics> => {
    const response = await api.get<VisitorAnalytics>(`/visitors/${visitorId}/analytics/`);
    return response.data;
};

export const getPageViewAggregation = async (params: {
    time_frame?: string;
    start_date?: string;
    end_date?: string;
}): Promise<Array<{
    path: string;
    title: string;
    total_views: number;
    unique_visitors: number;
    average_duration: string;
    bounce_rate: number;
    conversion_rate: number;
}>> => {
    const response = await api.get('/page-views/aggregate/', { params });
    return response.data;
};

export const getSessionAggregation = async (params: {
    time_frame?: string;
    start_date?: string;
    end_date?: string;
}): Promise<Array<{
    date: string;
    total_sessions: number;
    unique_visitors: number;
    average_duration: string;
    average_pages_per_session: number;
    bounce_rate: number;
}>> => {
    const response = await api.get('/sessions/aggregate/', { params });
    return response.data;
};

export const getEventAggregation = async (params: {
    time_frame?: string;
    start_date?: string;
    end_date?: string;
}): Promise<Array<{
    event_type: string;
    total_events: number;
    unique_visitors: number;
    average_per_session: number;
    conversion_rate: number;
}>> => {
    const response = await api.get('/events/aggregate/', { params });
    return response.data;
};

// Visitor journey
export const getVisitorJourney = async (visitorId: string): Promise<{
    visitor: Visitor;
    sessions: Session[];
    page_views: PageView[];
    events: Event[];
    conversion_path: Array<{
        type: string;
        timestamp: string;
        details: Record<string, any>;
    }>;
    total_duration: string;
    engagement_score: number;
}> => {
    const response = await api.get(`/visitors/${visitorId}/journey/`);
    return response.data;
};

// Device analytics
export const getDeviceAnalytics = async (params: {
    time_frame?: string;
    start_date?: string;
    end_date?: string;
}): Promise<Array<{
    device_type: string;
    browser: string;
    os: string;
    total_visitors: number;
    unique_visitors: number;
    average_session_duration: string;
    bounce_rate: number;
    conversion_rate: number;
}>> => {
    const response = await api.get('/visitors/device-analytics/', { params });
    return response.data;
}; 