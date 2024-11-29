# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

  class_group1 = ClassGroup.create(course: 1, module: "TUM", modality: "Presencial", number_students: 24, max_students: 30, location: "Taller 12", weekly_hours: 6)
  class_group2 = ClassGroup.create(course: 2, module: "PNG", modality: "Distancia", number_students: 12, max_students: 20, location: "Aula 106", weekly_hours: 6)
  accPlan1 = AccountingPlan.create(name: "PGC para PYMES", description: "El plan más utilizado por el alumnado", acronym: "PGC PYMES")
  accPlan2 = AccountingPlan.create(name: "PGC prueba1", description: "Plan para probar el Crud 1", acronym: "PGC prueba1")
  accPlan3 = AccountingPlan.create(name: "PGC prueba2", description: "Plan para probar el Crud 2", acronym: "PGC prueba2")
  school1 = SchoolCenter.create(school_name: "El rincon",address: "calle de prueba 1",phone: "123456789",email: "elrincon@ies.elrincon.es",website: "www.ieselrincon.es",province: "Las Palmas")
  school1 = SchoolCenter.create(school_name: "IES Siete Palmas",address: "calle de siete palmas 1",phone: "987654321",email: "sietePalmas@ies.elrincon.es",website: "www.sietePalmas.es",province: "Las Palmas")
  task1 = Task.create(title: "Tarea 1 - Ficticia S.L.", opening_date: Date.new(2024, 11, 27), closing_date: DateTime.new(2024, 12, 1, 23, 59, 0))
  task2 = Task.create(title: "Tarea 2 - Inventada S.L.", opening_date: Date.new(2024, 11, 12), closing_date: DateTime.new(2024, 12, 1, 23, 59, 0))
  statement1 = Statement.create(definition: "Compramos mercaderías a 30 días por 1250€. El proveedor nos incluye en factura un descuento comercial del 2%. Además, la compra tiene unos gastos de transporte de 100€", explanation: "Explicación 1")
  statement2 = Statement.create(definition: "Vendemos mercaderías por valor de 3000€. Para el cobro giramos una letra de cambio a 30 días, que es aceptada.", explanation: "Explicación 2")
  statement3 = Statement.create(definition: "Devolvemos mercaderías por valor de 200€  al proveedor, por estar inservibles.", explanation: "Explicación 3")
  statement4 = Statement.create(definition: "El proveedor nos hace un descuento del 20% en la mercancía que está un poco defectuosa. Se paga al proveedor mediante transferencia.", explanation: "Explicación 4")
  statement5 = Statement.create(definition: "Descontamos la letra de cambio en la entidad bancaria, la cual nos cobra una comisión de 30€ y unos intereses de 80€.", explanation: "Explicación 5")
  statement6 = Statement.create(definition: "Se devenga la nómina de uno de nuestros trabajadores. El importe íntegro es de 2000€. La cuota empresarial a la Seguridad Social asciende a 700€. La cuota de la SS del trabajador sería de 30€. La retención de IRPF sería de 350€. Pasada 1 semana se paga mediante trasferencia bancaria.", explanation: "Explicación 6")

  task1.statements << statement1
  task1.statements << statement2
  task1.statements << statement3

  task2.statements << statement4
  task2.statements << statement5
  task2.statements << statement6
  task2.statements << statement2


  solution1= Solution.create(description: "Descripcion solución 1 de prueba", statement: statement1)
  solution2= Solution.create(description: "Descripcion solución 2 de prueba", statement: statement2)
  solution3= Solution.create(description: "Descripcion solución 3 de prueba", statement: statement3)
  solution4= Solution.create(description: "Descripcion solución 4 de prueba", statement: statement4)
  solution5= Solution.create(description: "Descripcion solución 5 de prueba", statement: statement5)
  solution6= Solution.create(description: "Descripcion solución 6 de prueba", statement: statement6)

  entry1= Entry.create(solution:solution1, entry_number: 1, entry_date: Date.new(2024,11,25))
  entry2= Entry.create(solution:solution2, entry_number: 2, entry_date: Date.new(2024,11,26))

  annotation1 = Annotation.create(entry: entry1, number: 1, debit: 0 , credit: 100)
  annotation2 = Annotation.create(entry: entry1, number: 2, debit: 100 , credit: 0)
  annotation3 = Annotation.create(entry: entry2, number: 1, debit: 0 , credit: 300)
  annotation4 = Annotation.create(entry: entry2, number: 2, debit: 300 , credit: 0)

  account1 = Account.create(accountNumber: 1234, description: "Cuenta de prueba número 1", accounting_plan: accPlan1, name: "Cuenta 1")
  account2 = Account.create(accountNumber: 6543, description: "Cuenta de prueba número 2", accounting_plan: accPlan2, name: "Cuenta 2")
  account3 = Account.create(accountNumber: 2711, description: "Cuenta de prueba número 3", accounting_plan: accPlan3, name: "Cuenta 3")

  helpExample1 = HelpExample.create(creditMoves: "1 Movimientos Haber - Texto de ejemplo para probar el seed de Ayudas para las diferentes cuentas", debitMoves: "1 Movimientos Deber - Texto de ejemplo para probar el seed de Ayudas para las diferentes cuentas", account: account1)
  helpExample2 = HelpExample.create(creditMoves: "2 Movimientos Haber - Texto de ejemplo para probar el seed de Ayudas para las diferentes cuentas", debitMoves: "2 Movimientos Deber - Texto de ejemplo para probar el seed de Ayudas para las diferentes cuentas", account: account2)
  helpExample3 = HelpExample.create(creditMoves: "3 Movimientos Haber - Texto de ejemplo para probar el seed de Ayudas para las diferentes cuentas", debitMoves: "3 Movimientos Deber - Texto de ejemplo para probar el seed de Ayudas para las diferentes cuentas", account: account3)

  # Crear roles si no existen
  roles = %w[admin teacher student]

  roles.each do |role_name|
    Role.find_or_create_by(name: role_name)
  end

  # Crear un usuario de ejemplo (o encontrar uno existente)
  user = User.find_or_create_by(email: 'admin@admin.es') do |u|
    u.name = "Admin"
    u.first_lastName = "Admin"
    u.second_lastName = "Admin"
    u.password = 'password123'
    u.password_confirmation = 'password123'
  end

  # Asignar el rol 'admin' al usuario
  admin_role = Role.find_by(name: 'admin')
  if admin_role && !user.has_role?('admin')
    user.roles << admin_role
    puts "Rol 'admin' asignado al usuario #{user.email}"
  else
    puts "El usuario ya tiene el rol 'admin' o no se encontró el rol."
  end

  user = User.find_or_create_by(email: 'admin@admin.es') do |u|
    u.name = "Admin"
    u.first_lastName = "Admin"
    u.second_lastName = "Admin"
    u.password = 'password123'
    u.password_confirmation = 'password123'
  end

  # Asignar el rol 'admin' al usuario
  admin_role = Role.find_by(name: 'teacher')
  if admin_role && !user.has_role?('teacher')
    user.roles << admin_role
    puts "Rol 'admin' asignado al usuario #{user.email}"
  else
    puts "El usuario ya tiene el rol 'admin' o no se encontró el rol."
  end

  user = User.find_or_create_by(email: 'admin@admin.es') do |u|
    u.name = "Admin"
    u.first_lastName = "Admin"
    u.second_lastName = "Admin"
    u.password = 'password123'
    u.password_confirmation = 'password123'
  end

  # Asignar el rol 'admin' al usuario
  admin_role = Role.find_by(name: 'student')
  if admin_role && !user.has_role?('student')
    user.roles << admin_role
    puts "Rol 'admin' asignado al usuario #{user.email}"
  else
    puts "El usuario ya tiene el rol 'admin' o no se encontró el rol."
  end

  user = User.find_or_create_by(email: 'tiburcio@ieselrincon.es') do |u|
    u.name = "Tiburcio"
    u.first_lastName = "Cruz"
    u.second_lastName = "Ravelo"
    u.password = 'elrincon'
    u.password_confirmation = 'elrincon'
  end


  admin_role = Role.find_by(name: 'teacher')
  if admin_role && !user.has_role?('teacher')
    user.roles << admin_role
    puts "Rol 'teacher' asignado al usuario #{user.email}"
  else
    puts "El usuario ya tiene el rol 'teacher' o no se encontró el rol."
  end

  user = User.find_or_create_by(email: 'miguel@ieselrincon.es') do |u|
    u.name = "Miguel"
    u.first_lastName = "Figueroa"
    u.second_lastName = "García"
    u.password = 'elrincon'
    u.password_confirmation = 'elrincon'
  end


  admin_role = Role.find_by(name: 'teacher')
  if admin_role && !user.has_role?('teacher')
    user.roles << admin_role
    puts "Rol 'teacher' asignado al usuario #{user.email}"
  else
    puts "El usuario ya tiene el rol 'teacher' o no se encontró el rol."
  end

  user = User.find_or_create_by(email: 'echedey@ieselrincon.es') do |u|
    u.name = "Echedey"
    u.first_lastName = "Henríquez"
    u.second_lastName = "Hernández"
    u.password = 'elrincon'
    u.password_confirmation = 'elrincon'
  end

  admin_role = Role.find_by(name: 'student')
  if admin_role && !user.has_role?('student')
    user.roles << admin_role
    puts "Rol 'student' asignado al usuario #{user.email}"
  else
    puts "El usuario ya tiene el rol 'student' o no se encontró el rol."
  end
  