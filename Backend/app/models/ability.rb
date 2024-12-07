# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # Crea un usuario invitado si no está logueado.

    if user.admin?
      can :manage, :all
    elsif user.teacher?
      can :manage, ClassGroup
      can :manage, AccountingPlan
      can :manage, SchoolCenter
      # Asume que los maestros también pueden gestionar anotaciones
      can :manage, StudentAnnotation
    elsif user.student?
      cannot :manage, SchoolCenter
      cannot :manage, ClassGroup
      can :index, AccountingPlan
      can :show, AccountingPlan
      # Asume que los estudiantes pueden gestionar sus propias anotaciones
      can :manage, StudentAnnotation, user_id: user.id
    else
      cannot :manage, SchoolCenter
      cannot :manage, ClassGroup
      cannot :manage, AccountingPlan
    end
  end
end

