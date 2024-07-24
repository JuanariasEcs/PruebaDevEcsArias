/*
Scripts para poder crear la tabla de usuarios con datos de usuarios para poder realizar la visualizacion de la prueba de desarrollo

Clave: Arias2023*

*/


IF EXISTS (SELECT * FROM sys.objects WHERE type = 'U' AND name = 'UserApp')
DROP table UserApp
GO
CREATE TABLE UserApp (
    id INT PRIMARY KEY IDENTITY(1,1),
    UserName NVARCHAR(256) NOT NULL,
    Email NVARCHAR(256) NOT NULL,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    RefreshToken NVARCHAR(MAX),
    RefreshTokenExpiry DATETIME NOT NULL,
    role NVARCHAR(256),
    DateOfBirth DATE,
    PlaceOfBirth NVARCHAR(256),
    PhoneNumber NVARCHAR(20),
    Address NVARCHAR(512),
    Gender NVARCHAR(10),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

GO


IF EXISTS (SELECT '1' FROM UserApp)
truncate table UserApp

GO
-- Clave: Arias2023*
INSERT INTO UserApp (UserName, Email, PasswordHash, RefreshToken, RefreshTokenExpiry, role, DateOfBirth, PlaceOfBirth, PhoneNumber, Address, Gender)
VALUES 
('juanarias', 'juan45611@hotmail.es', '31fba94d5971f5025db6e401c6b937d8d7be727e5f390f32ae9c08e49339f368', '0', DATEADD(DAY, 7, GETDATE()), 'User', '2001-05-15', 'Bogotá', '3103336476', 'Dig 61c # 24 - 80', 'M'),
('juanarias_admin', 'juan.arias@ecs-la.com', '31fba94d5971f5025db6e401c6b937d8d7be727e5f390f32ae9c08e49339f368', '0', DATEADD(DAY, 7, GETDATE()), 'Admin', '2024-07-24', 'Berlin', '3175003568', 'Calle 3 # 3A Este - 61', 'M');

GO

