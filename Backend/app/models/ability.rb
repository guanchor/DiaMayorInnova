# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # Crea un usuario invitado si no está logueado.

    if user.admin? || user.teacher?
    # Los admin y teachers pueden gestionar todos los class_groups
      can :manage, ClassGroup
      can :manage, AccountingPlan
      can :manage, SchoolCenter

    elsif user.admin?
      can :manage, RegistrationsController
    elsif user.student?
      # Los estudiantes solo pueden leer (ver) los class_groups
      cannot :manage, SchoolCenter
      cannot :manage, ClassGroup
      can :index, AccountingPlan
      can :show, AccountingPlan
    else
      # Usuarios invitados no pueden hacer nada con los class_groups
      cannot :manage, SchoolCenter
      cannot :manage, ClassGroup
      cannot :manage, AccountingPlan
    end

  end
end
