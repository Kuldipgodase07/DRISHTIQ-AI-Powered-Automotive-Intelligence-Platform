from rest_framework.views import exception_handler
from rest_framework import status
from common.response import api_response

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        errors = []
        if isinstance(response.data, dict):
            for key, val in response.data.items():
                if isinstance(val, list):
                    errors.append(f"{key}: {' '.join(val)}")
                else:
                    errors.append(f"{key}: {val}")
        elif isinstance(response.data, list):
            errors = [str(e) for e in response.data]
        else:
            errors = [str(response.data)]

        return api_response(
            data=None,
            message="An error occurred while processing your request.",
            success=False,
            status_code=response.status_code,
            errors=errors,
        )

    return api_response(
        data=None,
        message=str(exc) if str(exc) else "Internal Server Error",
        success=False,
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        errors=[str(exc)],
    )
