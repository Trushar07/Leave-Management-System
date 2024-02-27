from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"detail": "Logged out successfully"}, status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"detail": f"Something went wrong! {repr(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
