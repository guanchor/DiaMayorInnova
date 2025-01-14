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
      can :manage, Task
      can :manage, Statement
      can :manage, Solution
      # Asume que los maestros también pueden gestionar anotaciones
      can :manage, StudentAnnotation
    elsif user.student?
      cannot :manage, SchoolCenter
      cannot :manage, ClassGroup
      cannot :manage, Task
      cannot :read, Task
      cannot :manage, Statement
      cannot :read, Statement
      cannot :manage, Solution
      cannot :manage, Entry
      cannot :manage, Annotation
      can :index, AccountingPlan
      can :show, AccountingPlan
      # Asume que los estudiantes pueden gestionar sus propias anotaciones
      can :manage, StudentAnnotation, user_id: user.id
    else
      # Usuarios invitados no pueden hacer nada con los class_groups
      cannot :manage, :all
      cannot :manage, SchoolCenter
      cannot :manage, ClassGroup
      cannot :manage, AccountingPlan
    end

    can :manage, Task, created_by: user.id
  end
end

