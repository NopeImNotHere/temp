if status is-interactive
    atuin init fish --disable-up-arrow | source
		zoxide init --cmd cd fish | source
end

set -x PATH /home/ninh/.local/bin $PATH
set -x PATH /home/ninh/.bin $PATH
set -x PATH /home/ninh/rofi/files/powermenu/type-3/powermenu.sh $PATH
function editconf -d "open ~/.config of current user"
    vscodium $HOME/.config/
end

function startDB -d "Starts Config for DB Lesson"
	sudo /opt/lampp/xampp startapache
	sudo /opt/lampp/xampp startmysql
end

function stopDB -d "Stops Config for DB Lesson"
	sudo /opt/lampp/xampp stopapache
	sudo /opt/lampp/xampp stopmysql
end
