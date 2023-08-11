import { useAuth } from "../context/AuthContext";
import EmailIcon from "@mui/icons-material/Email";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import KeyIcon from "@mui/icons-material/Key";
import DateRangeIcon from '@mui/icons-material/DateRange';
export const Perfil = () => {
  const { user } = useAuth();

  console.log("perfil usuario: ", user.usuario);
  const usuario = user.usuario;
  return (
    <div className="flex justify-center">
      <div class="w-full max-w-sm bg-white border border-[#191919] rounded-lg shadow dark:bg-[#191919] ">
        <div class="flex flex-col items-center pb-10 p-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="https://elcomercio.pe/resizer/24elgU66Gpm5ljnA3Q6Or3ZNuFU=/1200x1200/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/GYPOCN2JAFDUTKCXJRJDEPRPXY.jpg"
            alt=""
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {usuario.nombreUsuario}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            <PermIdentityIcon></PermIdentityIcon> Cliente
          </span>
          <div flex flex-col>
            <span>
              {" "}
              <EmailIcon></EmailIcon>correo: {usuario.correo}
              <br></br>
              <KeyIcon></KeyIcon> idUser: {usuario._id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
