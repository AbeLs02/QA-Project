import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from account.models import User
from .models import Message, Chat


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f'chat_{self.room_id}'

        # Join group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        print("\n\n connected to chat\n\n")

    async def disconnect(self, close_code):
        print(f"WebSocket disconnected. Code: {close_code}")

        # Leave group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        user_id = data['user_id']
        chat_id = self.room_id
        user = await self.get_user(user_id)
        chat = await self.get_chat(chat_id)
        profile = None
        if user.profile:
            profile = "http://localhost:8000" + user.profile.url

        message = await self.save_message(user, chat, message)
        # Send message to group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': {
                    "id": message.id,
                    "message": message.message,
                    "sent_at": message.sent_at.timestamp(),
                    "sender": {
                        'id': user.id,
                        'username': user.username,
                        'profile': profile,
                    },
                },
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'profile': profile,
                }
            }
        )

    async def chat_message(self, event):
        message = event['message']
        user = event['user']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'user': user
        }))

    @database_sync_to_async
    def get_user(self, user_id):
        return User.objects.get(pk=user_id)

    @database_sync_to_async
    def get_chat(self, chat_id):
        return Chat.objects.get(pk=chat_id)

    @database_sync_to_async
    def save_message(self, user, chat, message):
        message = Message.objects.create(sender=user, chat=chat, message=message)
        return message