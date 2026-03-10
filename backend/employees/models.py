from django.db import models

class Employee(models.Model):
    employee_id = models.CharField(max_length=20,unique=True)
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    DEPARTMENT_CHOICES = [
        ('IT', 'IT'),
        ('CS', 'Computer Science'),
        ('DS', 'Data Science'),
        ('HR', 'HR'),
        ('Python Developer', 'Python Developer'),
        ('Java Developer', 'Java Developer')
    ]
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name