# Path to Oh My Fish install.
set -q XDG_DATA_HOME
and set -gx OMF_PATH "$XDG_DATA_HOME/omf"
or set -gx OMF_PATH "$HOME/.local/share/omf"

#### Enable the time to be displayed.
set -g theme_display_time yes

#### Disable playing the user's current group.
set -g theme_display_group no

### Display the system hostname.
set -g theme_display_hostname yes

#### Disable Git-awareness.
set -g theme_display_git no

#### Don't disable jobs indicator.
set -g theme_display_jobs yes

#### Always display the jobs indicator, even if there are no jobs.
set -g theme_display_jobs_always yes

#### Hide the current directory read/write indicator.
set -g theme_display_rw yes

#### Don't display the VirtualEnv prompt.
set -g theme_display_virtualenv no

#### Display the battery
set -g theme_display_batt yes
set -g theme_display_batt_icon yes

set theme_primary 1eb980
set theme_secondary ffcf44
set theme_primary_variant 045d56
set theme_secondary_variant ff6859
set theme_hilight b15dff

set -g theme_prompt_batt_charging_char '↑'
set -g theme_prompt_batt_discharging_char '↓'
set -g theme_prompt_batt_0 ' '
set -g theme_prompt_batt_25 ' '
set -g theme_prompt_batt_50 ' '
set -g theme_prompt_batt_75 ' '
set -g theme_prompt_batt_100 ' '

set -g theme_display_time_format '+%H:%M %d.%m - %a'

set -g theme_color_user $theme_hilight
set -g theme_color_host $theme_primary_variant
set -g theme_color_separator brblack
set -g theme_color_normal normal
set -g theme_color_time $theme_secondary_variant
set -g theme_color_path $theme_primary
set -g theme_color_prompt $theme_secondary_variant
set -g theme_color_virtualenv $theme_secondary
set -g theme_color_status_prefix $theme_hilight
set -g theme_color_status_jobs $theme_primary
set -g theme_color_status_rw $theme_primary
set -g theme_display_group no
set -g theme_prompt_segment_separator_color $theme_primary
set -g theme_prompt_userhost_separator '.'
set -g __fish_git_prompt_char_branch_begin '['
set -g __fish_git_prompt_char_branch_end ']'
set -g __fish_git_prompt_color_branch_begin brblack
set -g __fish_git_prompt_color_branch_end brblack
set -g __fish_git_prompt_color_branch $theme_secondary

set -gx fish_prompt_pwd_dir_length 1
set -g theme_display_jobs_always yes

# Load Oh My Fish configuration.
source $OMF_PATH/init.fish
