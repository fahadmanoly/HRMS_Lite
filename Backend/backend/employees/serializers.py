from rest_framework import serializers
from .models import Employee, Attendance
from datetime import date

class AttendanceSerializer(serializers.ModelSerializer):
    
    employee_name = serializers.ReadOnlyField(source='employee.employee_name')

    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'employee_name', 'date', 'status']


class EmployeeSerializer(serializers.ModelSerializer):
    
    total_present_days = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = [
            'id', 
            'employee_id', 
            'employee_name', 
            'email', 
            'department', 
            'total_present_days',
        ]

    def get_total_present_days(self, total_days):
        return total_days.attendance_records.filter(status='Present').count()


