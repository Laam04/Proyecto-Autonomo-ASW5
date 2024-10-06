from django.db import models
    
class Cliente(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    number = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    address = models.TextField()
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.username
    
class Currency(models.Model):
    id = models.AutoField(primary_key=True)
    currency_name = models.CharField(max_length=100)
    currency_code = models.CharField(max_length=100)
    currency_symbol = models.CharField(max_length=100)
    exchange_rate = models.DecimalField(max_digits=10, decimal_places=2, default=0.00) # Base currency is USD
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.currency_name} ({self.currency_code})" 

class ClientAccounts(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    account_name = models.CharField(max_length=100) 
    account_number = models.CharField(max_length=100, unique=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.account_name} ({self.account_number})"

    

    