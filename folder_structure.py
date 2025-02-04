# import os

# def print_folder_structure(start_path, ignore_hidden=True, indent=0, ignore_folders=None):
#     """
#     Modified to skip specified folders in the directory tree
#     """
#     if ignore_folders is None:
#         ignore_folders = set()
#     else:
#         ignore_folders = set(ignore_folders)  # Convert to set for fast lookups

#     try:
#         entries = os.listdir(start_path)
#     except PermissionError:
#         print(' ' * indent + f"[Permission denied: {os.path.basename(start_path)}]")
#         return
#     except FileNotFoundError:
#         print(' ' * indent + f"[Directory not found: {start_path}]")
#         return

#     # Filter hidden files and ignored folders
#     filtered_entries = []
#     for entry in entries:
#         full_path = os.path.join(start_path, entry)
#         if ignore_hidden and entry.startswith('.'):
#             continue
#         if os.path.isdir(full_path) and entry in ignore_folders:
#             continue
#         filtered_entries.append(entry)

#     # Sort directories first, then files
#     filtered_entries.sort(key=lambda x: (not os.path.isdir(os.path.join(start_path, x)), x))

#     for index, entry in enumerate(filtered_entries):
#         full_path = os.path.join(start_path, entry)
#         is_last = index == len(filtered_entries) - 1

#         if os.path.isdir(full_path):
#             print(' ' * indent + ('└── ' if is_last else '├── ') + f"📁 {entry}/")
#             print_folder_structure(full_path, ignore_hidden, indent + 4, ignore_folders)
#         else:
#             print(' ' * indent + ('└── ' if is_last else '├── ') + f"📄 {entry}")

# if __name__ == "__main__":
#     current_dir = os.getcwd()
#     folders_to_skip = {'.next', '.vscode', 'node_modules', 'public', '.git'}  # Add your folders here
    
#     print(f"\nFolder structure for: {current_dir}\n")
#     print(f"📁 {os.path.basename(current_dir)}/")
#     print_folder_structure(current_dir, ignore_folders=folders_to_skip)
#     print("\n")

import os

def print_folder_structure(start_path, output_file, ignore_hidden=True, indent=0, ignore_folders=None):
    """
    Modified to skip specified folders in the directory tree
    """
    if ignore_folders is None:
        ignore_folders = set()
    else:
        ignore_folders = set(ignore_folders)  # Convert to set for fast lookups

    try:
        entries = os.listdir(start_path)
    except PermissionError:
        output_file.write(' ' * indent + f"[Permission denied: {os.path.basename(start_path)}]\n")
        return
    except FileNotFoundError:
        output_file.write(' ' * indent + f"[Directory not found: {start_path}]\n")
        return

    # Filter hidden files and ignored folders
    filtered_entries = []
    for entry in entries:
        full_path = os.path.join(start_path, entry)
        if ignore_hidden and entry.startswith('.'):
            continue
        if os.path.isdir(full_path) and entry in ignore_folders:
            continue
        filtered_entries.append(entry)

    # Sort directories first, then files
    filtered_entries.sort(key=lambda x: (not os.path.isdir(os.path.join(start_path, x)), x))

    for index, entry in enumerate(filtered_entries):
        full_path = os.path.join(start_path, entry)
        is_last = index == len(filtered_entries) - 1

        if os.path.isdir(full_path):
            output_file.write(' ' * indent + ('└── ' if is_last else '├── ') + f"📁 {entry}/\n")
            print_folder_structure(full_path, output_file, ignore_hidden, indent + 4, ignore_folders)
        else:
            output_file.write(' ' * indent + ('└── ' if is_last else '├── ') + f"📄 {entry}\n")


if __name__ == "__main__":
    current_dir = os.getcwd()
    folders_to_skip = {'.next', '.vscode', 'node_modules', 'public', '.git'}  # Add your folders here

    # Open the file in write mode
    with open("project_structure.txt", "w", encoding="utf-8") as output_file:
        output_file.write(f"Folder structure for: {current_dir}\n\n")
        output_file.write(f"📁 {os.path.basename(current_dir)}/\n")
        print_folder_structure(current_dir, output_file, ignore_folders=folders_to_skip)
        output_file.write("\n")

    print("Project structure has been written to 'project_structure.txt'")
