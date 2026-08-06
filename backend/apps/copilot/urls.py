from django.urls import path
from .views import CopilotChatView

urlpatterns = [
    path("query/", CopilotChatView.as_view(), name="copilot-query"),
]
