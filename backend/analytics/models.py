from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from visitors.models import Visitor, PageView, Session, Event

User = get_user_model()

class TimeFrame(models.Model):
    """Model to define time periods for analytics"""
    TIME_FRAME_CHOICES = (
        ('hourly', _('Hourly')),
        ('daily', _('Daily')),
        ('weekly', _('Weekly')),
        ('monthly', _('Monthly')),
        ('yearly', _('Yearly')),
    )

    name = models.CharField(_("Name"), max_length=50)
    time_frame = models.CharField(_("Time Frame"), max_length=20, choices=TIME_FRAME_CHOICES)
    start_date = models.DateTimeField(_("Start Date"))
    end_date = models.DateTimeField(_("End Date"))

    class Meta:
        verbose_name = _("Time Frame")
        verbose_name_plural = _("Time Frames")
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.name} ({self.time_frame})"

class PageAnalytics(models.Model):
    """Model to store page-level analytics"""
    page_view = models.ForeignKey(
        PageView,
        on_delete=models.CASCADE,
        related_name='analytics',
        verbose_name=_("Page View")
    )
    time_frame = models.ForeignKey(
        TimeFrame,
        on_delete=models.CASCADE,
        related_name='page_analytics',
        verbose_name=_("Time Frame")
    )
    unique_visitors = models.IntegerField(_("Unique Visitors"), default=0)
    total_views = models.IntegerField(_("Total Views"), default=0)
    average_time_on_page = models.FloatField(_("Average Time on Page"), default=0)
    bounce_rate = models.FloatField(_("Bounce Rate"), default=0)
    exit_rate = models.FloatField(_("Exit Rate"), default=0)
    conversion_rate = models.FloatField(_("Conversion Rate"), default=0)

    class Meta:
        verbose_name = _("Page Analytics")
        verbose_name_plural = _("Page Analytics")
        ordering = ['-time_frame__start_date']

    def __str__(self):
        return f"Analytics for {self.page_view.path} - {self.time_frame}"

class UserBehavior(models.Model):
    """Model to track user behavior patterns"""
    visitor = models.ForeignKey(
        Visitor,
        on_delete=models.CASCADE,
        related_name='behaviors',
        verbose_name=_("Visitor")
    )
    time_frame = models.ForeignKey(
        TimeFrame,
        on_delete=models.CASCADE,
        related_name='user_behaviors',
        verbose_name=_("Time Frame")
    )
    session_count = models.IntegerField(_("Session Count"), default=0)
    average_session_duration = models.FloatField(_("Average Session Duration"), default=0)
    pages_per_session = models.FloatField(_("Pages per Session"), default=0)
    return_rate = models.FloatField(_("Return Rate"), default=0)
    engagement_score = models.FloatField(_("Engagement Score"), default=0)
    last_activity = models.DateTimeField(_("Last Activity"), auto_now=True)

    class Meta:
        verbose_name = _("User Behavior")
        verbose_name_plural = _("User Behaviors")
        ordering = ['-last_activity']

    def __str__(self):
        return f"Behavior for {self.visitor} - {self.time_frame}"

class Conversion(models.Model):
    """Model to track conversion events"""
    CONVERSION_TYPES = (
        ('signup', _('Sign Up')),
        ('purchase', _('Purchase')),
        ('download', _('Download')),
        ('contact', _('Contact Form')),
        ('custom', _('Custom')),
    )

    visitor = models.ForeignKey(
        Visitor,
        on_delete=models.CASCADE,
        related_name='conversions',
        verbose_name=_("Visitor")
    )
    session = models.ForeignKey(
        Session,
        on_delete=models.CASCADE,
        related_name='conversions',
        verbose_name=_("Session")
    )
    conversion_type = models.CharField(_("Conversion Type"), max_length=50, choices=CONVERSION_TYPES)
    value = models.DecimalField(_("Value"), max_digits=10, decimal_places=2, null=True, blank=True)
    timestamp = models.DateTimeField(_("Timestamp"), auto_now_add=True)
    metadata = models.JSONField(_("Additional Metadata"), null=True, blank=True)

    class Meta:
        verbose_name = _("Conversion")
        verbose_name_plural = _("Conversions")
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.conversion_type} - {self.visitor} - {self.timestamp}"

class Report(models.Model):
    """Model to store generated reports"""
    REPORT_TYPES = (
        ('visitor', _('Visitor Report')),
        ('page', _('Page Report')),
        ('conversion', _('Conversion Report')),
        ('custom', _('Custom Report')),
    )

    name = models.CharField(_("Report Name"), max_length=255)
    report_type = models.CharField(_("Report Type"), max_length=50, choices=REPORT_TYPES)
    time_frame = models.ForeignKey(
        TimeFrame,
        on_delete=models.CASCADE,
        related_name='reports',
        verbose_name=_("Time Frame")
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='reports',
        verbose_name=_("Created By")
    )
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    data = models.JSONField(_("Report Data"))
    is_scheduled = models.BooleanField(_("Is Scheduled"), default=False)
    schedule_frequency = models.CharField(_("Schedule Frequency"), max_length=50, null=True, blank=True)
    last_generated = models.DateTimeField(_("Last Generated"), null=True, blank=True)

    class Meta:
        verbose_name = _("Report")
        verbose_name_plural = _("Reports")
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.report_type}"

class Metric(models.Model):
    """Model to store custom metrics"""
    name = models.CharField(_("Metric Name"), max_length=255)
    description = models.TextField(_("Description"))
    formula = models.TextField(_("Formula"))
    unit = models.CharField(_("Unit"), max_length=50)
    is_active = models.BooleanField(_("Is Active"), default=True)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        verbose_name = _("Metric")
        verbose_name_plural = _("Metrics")
        ordering = ['name']

    def __str__(self):
        return self.name 