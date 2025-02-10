import Swal from 'sweetalert2';

export default (icon, title) => {
    return Swal.fire({
        toast: true,
        title: title,
        icon: icon,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
};
