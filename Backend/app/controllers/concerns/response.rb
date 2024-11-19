module Response
    def json_response messages, is_success, data, featured_image, status
        render json: {
            messages: messages,
            is_success: is_success,
            data: data,
            featured_image: featured_image.present?
        }, status: status
    end
end