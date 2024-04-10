
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django import forms
from django.forms.widgets import PasswordInput, TextInput


# - Create/Register a user (Model Form)

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class CreateUserForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super(CreateUserForm, self).__init__(*args, **kwargs)
        
        # Altera o widget do campo username
        self.fields['username'].widget = forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Digite seu nome de usuário'})
        
        # Altera o widget do campo email
        self.fields['email'].widget = forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Digite seu endereço de e-mail'})
        
        # Altera o widget do campo password1
        self.fields['password1'].widget = forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Digite sua senha'})
        
        # Altera o widget do campo password2
        self.fields['password2'].widget = forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Confirme sua senha'})
        
        # Tradução dos labels dos campos
        self.fields['username'].label = 'Nome de usuário'
        self.fields['email'].label = 'Endereço de e-mail'
        self.fields['password1'].label = 'Senha'
        self.fields['password2'].label = 'Confirmação de senha'
        
        # Tradução dos textos de ajuda (helptext)
        self.fields['password1'].help_text = "Sua senha não pode ser muito semelhante às suas outras informações pessoais. Ela deve conter pelo menos 8 caracteres, não pode ser uma senha comum e não pode ser completamente numérica."
        self.fields['username'].help_text = "Obrigatório. 150 caracteres ou menos. Apenas letras, dígitos e @/./+/-/_ são permitidos."
        self.fields['password2'].help_text = "Digite a mesma senha que você digitou antes, para verificação."
    
        #self.fields['submit'] = forms.CharField(widget=forms.TextInput(attrs={'type': 'submit', 'value': 'Registrar'}))
        
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2',]
        error_messages = {
            'password_mismatch': "As senhas não coincidem.",
        }

    # Sobrescrever o método clean para personalizar a mensagem de erro
    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")
        if password1 != password2:
            self.add_error('password2', "As senhas não coincidem.")
            self.fields['password2'].widget.attrs.update({'class': 'form-control is-invalid'})

        return cleaned_data


class LoginForm(AuthenticationForm):

    username = forms.CharField(widget=TextInput())
    password = forms.CharField(widget=PasswordInput())