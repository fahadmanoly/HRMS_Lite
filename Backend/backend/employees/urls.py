from django.urls import path
from .views import EmployeeListView, EmployeeCreateView, EmployeeUpdateView, EmployeeDeleteView, attendance_list, attendance_mark


urlpatterns = [
    path('list/', EmployeeListView.as_view(), name='employee-list'),
    path('create/', EmployeeCreateView.as_view(), name='employee-create'),
    path('delete/', EmployeeDeleteView.as_view(), name='employee-delete'),
    path('attendance/list/', attendance_list, name='attendance-list'),
    path('attendance/mark/<int:emp_id>/', attendance_mark, name='attendance-mark'),
]