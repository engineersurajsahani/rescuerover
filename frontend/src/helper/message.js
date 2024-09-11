import swal from 'sweetalert';

export default function message(title, text, icon, button) {
    swal({
        title: title,
        text: text,
        icon: icon,
        button: button,
    });
}