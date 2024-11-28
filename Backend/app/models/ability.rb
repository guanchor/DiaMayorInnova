# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # Crea un usuario invitado si no está logueado.

    if user.admin? || user.teacher?
      # Los admin y teachers pueden gestionar todos los class_groups
      can :manage, ClassGroup
    elsif user.student?
      # Los estudiantes solo pueden leer (ver) los class_groups
      cannot :manage, ClassGroup
    else
      # Usuarios invitados no pueden hacer nada con los class_groups
      cannot :manage, ClassGroup
    end

  end
end
