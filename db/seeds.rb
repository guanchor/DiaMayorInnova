# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

accPlan1 = AccountingPlan.create(name: "PGC para PYMES", description: "El plan más utilizado por el alumnado", acronym: "PGC PYMES")
accPlan2 = AccountingPlan.create(name: "PGC prueba1", description: "Plan para probar el Crud 1", acronym: "PGC prueba1")
accPlan3 = AccountingPlan.create(name: "PGC prueba2", description: "Plan para probar el Crud 2", acronym: "PGC prueba2")