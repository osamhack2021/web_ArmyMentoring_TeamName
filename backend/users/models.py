from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from core.models import AbstractTimeStampModel

# Custom User 모델
class User(AbstractBaseUser, AbstractTimeStampModel, PermissionsMixin):

    # verbose 등을 추가할 수 있음
    username=models.CharField(max_length=10, null=False)
    email=models.EmailField(null=False, unique=True)
    nickname=models.CharField(max_length=20, null=False)
    profile_image=models.ImageField(null=True)
    experience_point=models.PositiveIntegerField(default=0)
    description=models.CharField(max_length=120, null=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
        'username',
        'nickname',
    ]

    # Meta로 정렬 순서 등을 정할 수도 있음

    def __str__(self):
        return self.email

# Custom User 생성을 위한 UserManager
class UserManager(BaseUserManager):

    # create_user와 create_superuser에 중복되는
    # 기본 유저 생성 메소드를 따로 분리해냄
    def _create_user(self, email, username, password, nickname, **extra_fields):
        if not email :
            raise ValueError('The given email mist be set')
        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        
        user = self.model(email = email, username = username, nickname=nickname, **extra_fields)
        user.set_password(password)
        user.save(using = self._db)
        return user

    # 기본 유저 생성 메소드 - 권한을 제한함
    def create_user(self, email, username = '', password = None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_admin', False)
        extra_fields.setdefault('is_active', True)
        return self._create_user(email, username, password, **extra_fields)
    
    # 슈퍼 유저 생성 메소드 - 모든 권한을 다 줌
    def create_superuser(self, email, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_active', True)

        return self._create_user(email, username, password, **extra_fields)

# User가 받은 리뷰
class UserReview(AbstractTimeStampModel):
    # 리뷰를 받는 멘토
    mentor=models.ForeignKey(User, related_name="received_reviews", on_delete=models.CASCADE)
    # 리뷰를 쓴 멘티
    mentee=models.ForeignKey(User, related_name="created_reviews", on_delete=models.CASCADE)
    # 리뷰의 내용
    content=models.TextField(null=False)

    # 기본 이름으로 뭘 정해할 지 잘 모르겠음
    def __str__(self):
        return 'To: ' + self.mentor + ', From: ' + self.mentee
