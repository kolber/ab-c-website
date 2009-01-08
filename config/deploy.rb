set :application, "ab-c"
set :repository,  "git@github.com:kolber/ab-c-website.git"
set :scm, "git"
set :branch, "bigarel-rip"

set :deploy_via, :copy
set :deploy_to, "/home/ben/#{application}"

role :app, "ab-c.com.au"
role :web, "ab-c.com.au"
role :db,  "ab-c.com.au", :primary => true

# Override tasks not needed for deployment of static files
namespace :deploy do
  task :finalize_update do
    logger.info 'do nothing - overridden finalize_update'
  end

  task :restart do
    logger.info 'do nothing - overridden finalize_update'
  end
end