from django.shortcuts import render

from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from django.contrib.auth.models import User
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from Crypto.Util.Padding import unpad
from binascii import b2a_hex, a2b_hex
from assets import constant
from assets import utils


class AEScoder():
    def __init__(self, key=constant.key, iv=constant.iv):
        self.__key = key
        self.__iv = iv

    # AES加密
    def encrypt(self, data):
        cipher = AES.new(self.__key, AES.MODE_CBC, self.__iv)
        encrData = cipher.encrypt(pad(data.encode('utf-8'), 16, 'pkcs7'))
        return b2a_hex(encrData)

    # AES解密
    def decrypt(self, encrData):
        cipher = AES.new(self.__key, AES.MODE_CBC, self.__iv)
        decrData = cipher.decrypt(a2b_hex(encrData))
        return unpad(decrData, 16, 'pkcs7').decode('utf-8')


@api_view(['POST'])
def create_user(request):
    aes = AEScoder()
    username = request.data['username']
    if utils.is_empty(username):
        return JsonResponse({"error": "用户名不能为空"}, safe=False)
    pwd = request.data['password']
    if utils.is_empty(pwd):
        return JsonResponse({"error": "密码不能为空"}, safe=False)
    pwd = aes.decrypt(pwd)
    # 验证是否已经存在账户
    is_name_existed = True if User.objects.filter(username=username).count() > 0 else False
    if is_name_existed:
        return JsonResponse({"error": "用户已存在"}, safe=False)
    else:
        User.objects.create_user(username, None, pwd)
        return JsonResponse({"result": True}, safe=False)


@api_view(['POST'])
def get_keys(request):
    return JsonResponse({"key": constant.key.decode(), "iv": constant.iv.decode()})


@api_view(['POST'])
def login(request):
    aes = AEScoder()
    username = request.data['username']
    if utils.is_empty(username):
        return JsonResponse({"error": "用户名不能为空"}, safe=False)
    pwd = request.data['password']
    if utils.is_empty(pwd):
        return JsonResponse({"error": "密码不能为空"}, safe=False)
    pwd = aes.decrypt(pwd)
    # 验证是否已经存在账户
    is_name_existed = True if User.objects.filter(username=username).count() > 0 else False
    # 验证密码是否正确
