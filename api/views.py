from django.shortcuts import render
from django.http import HttpResponse
import os
import socketio

async_mode = None


BASE_DIR = os.path.dirname(os.path.realpath(__file__))

sio = socketio.Server(async_mode='eventlet')

# Create your views here.
@sio.on('connection-bind')
def connection_bind(sid, data):
    pass


@sio.on('disconnect')
def disconnect(sid):
    pass
