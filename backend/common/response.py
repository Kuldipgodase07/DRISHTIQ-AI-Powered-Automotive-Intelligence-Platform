from rest_framework.response import Response
from rest_framework import status

def api_response(data=None, message="Success", success=True, status_code=status.HTTP_200_OK, errors=None):
    """
    Standardized API response structure for enterprise consistency.
    """
    payload = {
        "success": success,
        "message": message,
        "data": data if data is not None else {},
        "errors": errors if errors is not None else [],
    }
    return Response(payload, status=status_code)
