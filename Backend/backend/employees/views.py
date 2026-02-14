from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer
from rest_framework.decorators import api_view


class EmployeeListView(APIView):
    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)


class EmployeeCreateView(APIView):
    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class EmployeeDeleteView(APIView):
    def delete(self, request):
        emp_id = request.data.get('id')
        try:
            employee = Employee.objects.get(pk=emp_id)
            employee.delete()
            return Response({"message": "Successfully deleted"}, status=status.HTTP_204_NO_CONTENT)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        
        


@api_view(['GET'])
def attendance_list(request):

    emp_id = request.query_params.get('employee_id')
    if not emp_id:
        return Response({"error": "employee_id query parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

    data = Attendance.objects.filter(employee_id=emp_id).order_by('-date')
    serializer = AttendanceSerializer(data, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def attendance_mark(request, emp_id):
    
    try:
        employee = Employee.objects.get(id=emp_id)
    except Employee.DoesNotExist:
        return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

    att_date = request.data.get('date')
    
    if Attendance.objects.filter(employee=employee, date=att_date).exists():
        return Response(
            {"error": f"Attendance already marked for {employee.employee_name} on {att_date}"}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    data = request.data.copy()
    data['employee'] = employee.id
    
    serializer = AttendanceSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)