# Semi1-Grupo12-Proyecto2

<div align="center">

| Integrantes                   | Carné     |
| :---------------------------- | :-------- |
| Derek Esquivel Díaz           | 202010055 |
| José Andrés Montenegro Santos | 202004804 |
| Carlos Daniel Acabal Pérez    | 202004724 |
| Kevin Nicolas Garcia Martinez | 201403793 |

</div>

## ARQUITECTURA IMPLEMENTADA

Se utilizó AWS para usar los distintos servicios de la capa gratuita. En esta ocasión se manejaron 2 cuentas de AWS, la primera posee una VPC la cual tiene una instancia EC2 y Amazon Cognito.
- VPC1:
    - EC2: Esta instancia posee un contenedor para manejar la base de datos en MYSQL
    - Cognito: Se utilizó para manejar usuarios, sesiones, autenticación, para un control los usuarios los clientes 
- VPC2: 
Esta red posee el frontend y backend del sistema, así como la mayoría de servicios de Amazon, los cuales son:
    - EC2: Esta instancia utiliza Docker Compose para crear una red entre 2 contenedores (uno para el backend y otro para el frontend), ambas imágenes poseen su propio Dockerfile
    - API Gateway: Se utilizó este servicio para manejar Amazon Translate
    - S3: Este bucket nos permite almacenar objetos, entre ellos: imágenes de avatares y posts.
    - Amazon Lex: Con este servicio consultamos a un chatbot previamente configurado
    - Amazon Rekognition: Este servicio extrae etiquetas de las publicaciones hechas, así como comparación de rostros para iniciar sesión.
    - Lambda Function: Esta función hace una conexión entre el backend y Amazon Translate
    - Amazon Translate: Este servicio principalmente es consumido por la función Lambda, y como segunda opción se conecta al backend

La conexión entre las 2 VPCs se manejan por medio de reglas de Grupos de Seguridad, el cliente puede acceder al sistema mediante la ip pública de la VPC2.

Además la comunicación entre frontend y backend se maneja por protocolo HTTP hacia la misma ip pública de EC2 (a pesar de que están en una red por Docker Compose)

![arqui](./img/Arqui-Semi1-P2.png)

## USUARIOS IAM
### Administrador
Este usuario se creó para manejar evitar el uso del usuario Root. Además, se utilizó para crear más usuario IAM para los servicios utilizados
#### Políticas
- AdministratorAccess: Esta política provee acceso total a los servicios y recursos de AWS
```JSON
{
  "Version" : "2012-10-17",
  "Statement" : [
    {
      "Effect" : "Allow",
      "Action" : "*",
      "Resource" : "*"
    }
  ]
}
```
### EC2
Este usuario se creó para tener acceso solamente al servicio EC2, incluye manejo de instancias, grupos de seguridad, balanceadores de carga, volúmenes de instancias.
#### Políticas
- AmazonEC2FullAccess: Esta política provee acceso a Amazon EC2 a través de la consola de AWS.
```JSON
{
  "Version" : "2012-10-17",
  "Statement" : [
    {
      "Action" : "ec2:*",
      "Effect" : "Allow",
      "Resource" : "*"
    },
    {
      "Effect" : "Allow",
      "Action" : "elasticloadbalancing:*",
      "Resource" : "*"
    },
    {
      "Effect" : "Allow",
      "Action" : "cloudwatch:*",
      "Resource" : "*"
    },
    {
      "Effect" : "Allow",
      "Action" : "autoscaling:*",
      "Resource" : "*"
    },
    {
      "Effect" : "Allow",
      "Action" : "iam:CreateServiceLinkedRole",
      "Resource" : "*",
      "Condition" : {
        "StringEquals" : {
          "iam:AWSServiceName" : [
            "autoscaling.amazonaws.com",
            "ec2scheduled.amazonaws.com",
            "elasticloadbalancing.amazonaws.com",
            "spot.amazonaws.com",
            "spotfleet.amazonaws.com",
            "transitgateway.amazonaws.com"
          ]
        }
      }
    }
  ]
}
```
### S3
Este usuario se creó para manejar buckets para el almacenamiento de imágenes de usuarios y de publicaciones. También para utilizar el servicio en el backend a través del SDK de AWS.
#### Políticas
- AmazonS3FullAccess: Provee acceso completo a todos los buckets a través de la Consola de AWS.
```JSON
{
  "Version" : "2012-10-17",
  "Statement" : [
    {
      "Effect" : "Allow",
      "Action" : [
        "s3:*",
        "s3-object-lambda:*"
      ],
      "Resource" : "*"
    }
  ]
}
```
### Rekognition 
Este usuario se creó para utilizar la funcionalidad de comparación de rostros y extracción de etiquetas de una imagen. Solamente es utilizado desde el backend.
#### Políticas
- AmazonRekognitionFullAccess: Provee acceso a todas las APIs de Amazon Rekognition.
```JSON 
{
  "Version" : "2012-10-17",
  "Statement" : [
    {
      "Effect" : "Allow",
      "Action" : [
        "rekognition:*"
      ],
      "Resource" : "*"
    }
  ]
}
```
### Translate
Este usuario se creó para traducir el texto de publicaciones a través de la API, la cual fue utilizada en el backend.
#### Políticas
- TranslateFullAccess: Provee acceso total a Amazon Translate
```JSON
{
  "Version" : "2012-10-17",
  "Statement" : [
    {
      "Action" : [
        "translate:*",
        "comprehend:DetectDominantLanguage",
        "cloudwatch:GetMetricStatistics",
        "cloudwatch:ListMetrics",
        "s3:ListAllMyBuckets",
        "s3:ListBucket",
        "s3:GetBucketLocation",
        "iam:ListRoles",
        "iam:GetRole"
      ],
      "Effect" : "Allow",
      "Resource" : "*"
    }
  ]
}
```
### Lex
Este usuario se creó para crear un bot que responde a preguntas sobre la Facultad de Ingeniería. Además se utilizó en el backend para comunicarse con la API con el fin de enviar y recibir mensajes.
#### Políticas
- AmazonLexFullAccess: Proporciona acceso completo a Amazon Lex a través deAWS Management Console. También proporciona acceso para crear funciones vinculadas al servicio Lex y conceder permisos a Lex para invocar un conjunto limitado de funciones de Lambda.
```JSON 
{
  "Version" : "2012-10-17",
  "Statement" : [
    {
      "Effect" : "Allow",
      "Action" : [
        "cloudwatch:GetMetricStatistics",
        "cloudwatch:DescribeAlarms",
        "cloudwatch:DescribeAlarmsForMetric",
        "kms:DescribeKey",
        "kms:ListAliases",
        "lambda:GetPolicy",
        "lambda:ListFunctions",
        "lex:*",
        "polly:DescribeVoices",
        "polly:SynthesizeSpeech",
        "kendra:ListIndices",
        "iam:ListRoles",
        "s3:ListAllMyBuckets",
        "logs:DescribeLogGroups",
        "s3:GetBucketLocation"
      ],
      "Resource" : [
        "*"
      ]
    },
    {
      "Effect" : "Allow",
      "Action" : [
        "lambda:AddPermission",
        "lambda:RemovePermission"
      ],
      "Resource" : "arn:aws:lambda:*:*:function:AmazonLex*",
      "Condition" : {
        "StringEquals" : {
          "lambda:Principal" : "lex.amazonaws.com"
        }
      }
    },
    {
      "Effect" : "Allow",
      "Action" : [
        "iam:GetRole"
      ],
      "Resource" : [
        "arn:aws:iam::*:role/aws-service-role/lex.amazonaws.com/AWSServiceRoleForLexBots",
        "arn:aws:iam::*:role/aws-service-role/channels.lex.amazonaws.com/AWSServiceRoleForLexChannels",
        "arn:aws:iam::*:role/aws-service-role/lexv2.amazonaws.com/AWSServiceRoleForLexV2Bots*",
        "arn:aws:iam::*:role/aws-service-role/channels.lexv2.amazonaws.com/AWSServiceRoleForLexV2Channels*"
      ]
    },
    {
      "Effect" : "Allow",
      "Action" : [
        "iam:CreateServiceLinkedRole"
      ],
      "Resource" : [
        "arn:aws:iam::*:role/aws-service-role/lex.amazonaws.com/AWSServiceRoleForLexBots"
      ],
      "Condition" : {
        "StringEquals" : {
          "iam:AWSServiceName" : "lex.amazonaws.com"
        }
      }
    },
    {
      "Effect" : "Allow",
      "Action" : [
        "iam:CreateServiceLinkedRole"
      ],
      "Resource" : [
        "arn:aws:iam::*:role/aws-service-role/channels.lex.amazonaws.com/AWSServiceRoleForLexChannels"
      ],
      "Condition" : {
        "StringEquals" : {
          "iam:AWSServiceName" : "channels.lex.amazonaws.com"
        }
      }
    },
    {
      "Effect" : "Allow",
      "Action" : [
        "iam:CreateServiceLinkedRole"
      ],
      "Resource" : [
        "arn:aws:iam::*:role/aws-service-role/lexv2.amazonaws.com/AWSServiceRoleForLexV2Bots*"
      ],
      "Condition" : {
        "StringEquals" : {
          "iam:AWSServiceName" : "lexv2.amazonaws.com"
        }
      }
    },
    {
      "Effect" : "Allow",
      "Action" : [
        "iam:CreateServiceLinkedRole"
      ],
      "Resource" : [
        "arn:aws:iam::*:role/aws-service-role/channels.lexv2.amazonaws.com/AWSServiceRoleForLexV2Channels*"
      ],
      "Condition" : {
        "StringEquals" : {
          "iam:AWSServiceName" : "channels.lexv2.amazonaws.com"
        }
      }
    },
    {
      "Effect" : "Allow",
      "Action" : [
        "iam:DeleteServiceLinkedRole",
        "iam:GetServiceLinkedRoleDeletionStatus"
      ],
      "Resource" : [
        "arn:aws:iam::*:role/aws-service-role/lex.amazonaws.com/AWSServiceRoleForLexBots",
        "arn:aws:iam::*:role/aws-service-role/channels.lex.amazonaws.com/AWSServiceRoleForLexChannels",
        "arn:aws:iam::*:role/aws-service-role/lexv2.amazonaws.com/AWSServiceRoleForLexV2Bots*",
        "arn:aws:iam::*:role/aws-service-role/channels.lexv2.amazonaws.com/AWSServiceRoleForLexV2Channels*"
      ]
    },
    {
      "Effect" : "Allow",
      "Action" : [
        "iam:PassRole"
      ],
      "Resource" : [
        "arn:aws:iam::*:role/aws-service-role/lex.amazonaws.com/AWSServiceRoleForLexBots"
      ],
      "Condition" : {
        "StringEquals" : {
          "iam:PassedToService" : [
            "lex.amazonaws.com"
          ]
        }
      }
    },
    {
      "Effect" : "Allow",
      "Action" : [
        "iam:PassRole"
      ],
      "Resource" : [
        "arn:aws:iam::*:role/aws-service-role/lexv2.amazonaws.com/AWSServiceRoleForLexV2Bots*"
      ],
      "Condition" : {
        "StringEquals" : {
          "iam:PassedToService" : [
            "lexv2.amazonaws.com"
          ]
        }
      }
    },
    {
      "Effect" : "Allow",
      "Action" : [
        "iam:PassRole"
      ],
      "Resource" : [
        "arn:aws:iam::*:role/aws-service-role/channels.lexv2.amazonaws.com/AWSServiceRoleForLexV2Channels*"
      ],
      "Condition" : {
        "StringEquals" : {
          "iam:PassedToService" : [
            "channels.lexv2.amazonaws.com"
          ]
        }
      }
    }
  ]
}
```

### Amazon Cognito
Se creó un usuario con los permisos necesarios para que pueda interactuar con cognito, sin embargo AWS no posee una política de full access para este servicio, por lo cual se le tuvo que asignar un conjunto de políticas para brindarle los privilegios necesarios para usarlo en el desarrollo de la aplicación.

#### Políticas

* **AmazonCognitoDeveloperAuthenticatedIdentitiesInfo**

Este permiso le permite al usuario el acceso a las APIS de Cognito para el soporte de entidades autenticadas por un desarrollador desde un backend de autenticación.

* **AmazonCognitoPowerUser**

Este permiso provee acceso de administración a los recursos ya existentes dentro de Cognito, sin embargo se necesitarán privilegios de administrador de cuentas para crear nuevos recursos.

* **AmazonCognitoReadOnly**

Provee acceso (solamente de lectura) a los recursos de Cognito.

* **AmazonCognitoUnAuthedIdentitiesSessionPolicy**

Esta política es un conjunto de permisos que son permitidos a entidades no autenticadas en las pools de usuarios de Cognito.

* **AmazonCognitoUnauthenticatedIdentities**

Es muy parecida a la anterior, con la diferencia de que la política anterior está más enfocada a evitar que se puedan asignar políticas demasiado permisivas a roles en un grupo de entidades.

* **AmazonESCognitoAccess**

Provee un acceso (limitado) al servicio de configuracion de Cognito.

* **AmazonOpenSearchServiceCognitoAccessInfo**

Provee acceso completo al servicio de configuración de Cognito.

![Cognito](./img/cognito_admin.png)

### VPC

A su vez, debido al uso de EC2 y demás servicios que requerirán estar expuestos públicamente, se creó un usuario administrador del servicio VPC, para que este pueda configurar y gestionar el acceso que se tiene a los recursos y servicios de Amazon.

#### Políticas

* **AmazonVPCFullAccess**

Esta política provee un acceso completo a Amazon VPC por medio de la consola de administración de AWS.

![VPC](./img/vpc_admin.png)

### EC2

Como se mencionó anteriormente, algunas de las partes medulares de la arquitectura se encuentran desplegadas en instancias de EC2, por esto entonces se creó un usuario con permisos de administrador sobre este servicio, que fuera capaz de gestionar y editar las configuraciones que se puedan hacer en las instancias.


#### Políticas

* **AmazonVPCFullAccess**
Esta política provee un acceso completo a Amazon EC2 por medio de la consola de administración de AWS.

![EC2](./img/ec2_admin.png)
