Rails.application.routes.draw do
  devise_for :users
  devise_scope :user do
    root 'pages#home'
    get '/pages/admin'
  end

  get '/add-a-track', to: 'pages#add_a_track'

  resources :tracks, only: [:index, :show]
  get 's3_direct_post' => 'tracks#s3_direct_post'
  post 's3_blob_location' => 'tracks#s3_blob_location'

  resources :likes
end
