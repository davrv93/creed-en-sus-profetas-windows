from rest_framework import serializers, viewsets
from rest_framework.response import Response
from rest_framework.decorators import list_route
from rest_framework.exceptions import ParseError
from rest_framework import status
from rest_framework.views import APIView
from apps.mod_configuracion.models.conf_usuario import Conf_Usuario
from apps.mod_configuracion.models.conf_grupo import Conf_Grupo
from apps.mod_configuracion_api.views.conf_personaView import PersonaSerializer
from apps.mod_configuracion_api.views.conf_filialView import FilialSerializer
from apps.mod_configuracion_api.views.conf_moduloView import ModuloSerializer
from django.contrib.auth.models import Group,Permission



# Create your views here.
class PermisosSerializer(serializers.ModelSerializer):
    class Meta:
        model= Permission
        fields = ('name',)


class GroupSerializer(serializers.ModelSerializer):
    modulo = ModuloSerializer(many = True)
    class Meta:
        model= Conf_Grupo
        fields = ('name','modulo',)

class GrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Conf_Grupo
        fields = ('name','id',)
      

class UsuarioInfoSerializer(serializers.ModelSerializer):
    persona = PersonaSerializer()
    filial = FilialSerializer()
    grupo_sge = GroupSerializer(many=True)
    class Meta:
        model = Conf_Usuario 
        exclude = ['password','user_permissions','groups', ]

class ObtenerUsuario(APIView):

    def get(self, request, format=None):
        print (self.request.user)
        usernames = self.request.user
        serializer = UsuarioInfoSerializer(usernames)
        return Response(serializer.data)

class UsuarioSerializer(serializers.ModelSerializer):
    nombre_persona = serializers.CharField(source='persona.nombre', read_only=True)
    persona_id = serializers.CharField(source='persona.id', read_only=True)
    nombre_filial = serializers.CharField(source='filial.direccion', read_only=True)
    filial_id = serializers.CharField(source='filial.id', read_only=True)
    grupo_sge = GrupoSerializer(many=True)
    class Meta:
        model = Conf_Usuario 
        exclude = ['user_permissions','groups',]

class UsuarioCUSerializer(serializers.ModelSerializer):
    nombre_persona = serializers.CharField(source='persona.nombre', read_only=True)
    nombre_filial = serializers.CharField(source='filial.direccion', read_only=True)

    class Meta:
        model = Conf_Usuario 
        exclude = ['user_permissions','groups',]

    def create(self, validated_data):
        print('=================================================================================================================' );
        print(Conf_Grupo.objects.get(id=7));
        grupo = Conf_Grupo.objects.get(id=7);
        user = Conf_Usuario(
            email=validated_data['email'],
            username=validated_data['username'],
            persona=validated_data['persona'],           
            filial=validated_data['filial'],

        )
        user.grupo_sge.add(grupo);
        user.set_password(validated_data['password']);       
        user.save()

        return user


class UsuarioViewSet( viewsets.ModelViewSet):
    queryset = Conf_Usuario.objects.all()
    serializer_class = UsuarioCUSerializer

    def list(self, request):        
        queryset = Conf_Usuario.objects.all()
        serial = UsuarioSerializer(queryset, many=True)
        return Response(serial.data)

    def update(self, request, pk=None):
        try:
            instance = self.get_object()
            instance.set_password(serializer.data['password'])
            instance.save()
            serializer = self.get_serializer(instance, data=request.data)
            if serializer.is_valid():                
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)

        except CanalRef.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def create(self, request):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

  


        #instance = self.get_object()
        #instance.set_password(serializer.data['password'])
        #instance.save()
        #serializer = self.get_serializer(data=request.data)
        #if serializer.is_valid():              
        #    self.perform_create(serializer)
        #    return Response(serializer.data)
        #else:
        #     return Response(serializer.errors,
        #                    status=status.HTTP_400_BAD_REQUEST)    