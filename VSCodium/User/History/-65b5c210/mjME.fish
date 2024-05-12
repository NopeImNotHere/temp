if status is-interactive
    atuin init fish --disable-up-arrow | source
		zoxide init --cmd cd fish | source
end

fish_ssh_agent

set -x PATH /home/ninh/.local/bin $PATH
set -x PATH /home/ninh/.bin $PATH
set -x PATH /home/ninh/rofi/files/powermenu/type-3/ $PATH
set -x STEAMAPIKEYNINH "8C508C26EDC4B0AF6302FCD4FC7F5DA7"
set -gx LD_LIBRARY_PATH /usr/lib $LD_LIBRARY_PATH
set -gx GPG_TTY 54BF71CA756AA19D 
set -gx EDITOR vim


function editconf -d "open ~/.config of current user"
    vscodium $HOME/.config/
end

function startDB -d "Starts Config for DB Lesson"
	sudo systemctl start httpd
	sudo systemctl start mysqld
end

function stopDB -d "Stops Config for DB Lesson"
	sudo systemctl stop httpd
	sudo systemctl stop mysqld
end
