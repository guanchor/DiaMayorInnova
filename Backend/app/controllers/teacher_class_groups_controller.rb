class TeacherClassGroupsController < ApplicationController
  before_action :authenticate_user!

  # def index
  #   @solution = Solution.includes(statement: :tasks).where(tasks: { id: params[:task_id] })
  #   render json: @solution

  # def index
  #   @statements = Task.includes(statements: { solutions: :entries })
  #   if @statements.any?
  #     render json: @statements, include: { solutions: { include: { entries: { include: :annotations } } }}
  #   else
  #     render json: { error: 'No statements found for the given task' }, status: :not_found
  #   end
  # end

  def index
    @tasks = Task.includes(statements: { solutions: { entries: :annotations } }).where(id: params[:task_id])
  
    if @tasks.any?
      render json: @tasks, include: { statements: { include: { solutions: { include: { entries: { include: :annotations } } } } } }
    else
      render json: { error: 'No tasks found' }, status: :not_found
    end
  end

    # if current_user.student?
    #   @teacherClassGroups = TeacherClassGroup.all
    #   render json: @teacherClassGroups
    # else
    #   if current_user.admin?
    #     # render json: { message: "Operación exitosa"}
    #     @teacherClassGroups = TeacherClassGroup.all
    #   render json: @teacherClassGroups
    #   end
    # end
      # render json: @teacherClassGroups


  def create
    if current_user.student?
      render json: { error: "No autorizado" }, status: :forbidden
    else
      @teacher_class_group = TeacherClassGroup.new(teacherClassGroup_params)
  
      if @teacher_class_group.save
        render json: { message: "Grupo creado exitosamente", data: @teacher_class_group }, status: :created
      else
        render json: { message: "Error al crear el grupo", errors: @teacher_class_group.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  private

  def teacherClassGroup_params
    params.require(:teacher_class_group).permit(:user_id, :class_group_id)
  end

end
