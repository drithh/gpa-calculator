const toggleSelect = (selectMenu) => {
  const button = selectMenu.querySelector('button');
  const list = selectMenu.querySelector('ul');
  if (button.classList.contains('show')) {
    button.classList.remove('ring-blue-500');
    button.classList.add('ring-secondary');
  } else {
    button.classList.remove('ring-secondary');
    button.classList.add('ring-blue-500');
  }
  list.classList.toggle('hidden');
  button.classList.toggle('show');
};

const addRow = () => {
  const nama = document.querySelector('#mata-kuliah');
  const sks = document.querySelector('#sks');
  const nilai = document.querySelector('#nilai');

  if (!nama.value) {
    alert('Nama Mata Kuliah Tidak Boleh Kosong');
  } else if (sks.innerHTML === 'Pilih SKS') {
    alert('SKS Tidak Boleh Kosong');
  } else if (nilai.innerHTML === 'Pilih Nilai') {
    alert('Nilai Tidak Boleh Kosong');
  } else {
    const rowData = {
      nama: nama.value,
      sks: sks.innerHTML.replace(/\s/g, ''),
      nilai: angkaKeHuruf(nilai.innerHTML.replace(/\s/g, '')),
    };

    sks.innerHTML = 'Pilih SKS';
    nilai.innerHTML = 'Pilih Nilai';
    nama.value = '';

    const row = setRow(rowData);
    document.querySelector('.table-body').innerHTML += row;

    updateGPA();
  }
};

const setRow = (rowData) => {
  return `
    <div
      class="item-table flex h-16 px-4 place-items-center border-b-secondary border-b-[1px] border-opacity-50"
    >
      <div
        class="font-Source text-base text-primary opacity-80 text-center w-[40%]"
      >
        ${rowData.nama}
      </div>
      <div
        class="font-Source text-base text-primary opacity-80 text-center w-[25%]"
      >
        ${rowData.sks}
      </div>
      <div
        class="font-Source text-base text-primary opacity-80 text-center w-[25%]"
      >
        ${rowData.nilai}
      </div>
      <div
        class="font-Source text-base text-primary opacity-80 text-left w-[10%] flex place-content-center"
      >
        <button
          class="hover:bg-gray-100 w-12 h-12 duration-500 rounded-full flex place-content-center place-items-center"
          onclick="deleteRow(this);"
        >
          <svg fill="#424242" width="35" height="35" version="2.0">
            <use href="#trash-bin" />
          </svg>
        </button>
      </div>
    </div>
  `;
};

const deleteRow = (row) => {
  row.parentNode.parentNode.remove();
  updateGPA();
};

const setSelectValue = (el) => {
  const selectMenu = el.parentNode.parentNode;
  selectMenu.querySelector('span').innerHTML = el.innerHTML;
  toggleSelect(selectMenu);
};

const angkaKeHuruf = (nilai) => {
  return String.fromCharCode(nilai * -1 + 69);
};

const hurufKeAngka = (nilai) => {
  return (nilai.charCodeAt() - 69) * -1;
};

let animateGPA;

const updateGPA = () => {
  const tableBody = document.querySelector('.table-body');
  const rows = tableBody.querySelectorAll('.item-table');
  let totalSks = 0;
  let totalNilai = 0;
  rows.forEach((row) => {
    const sks = row
      .querySelector('.text-center')
      .nextElementSibling.innerHTML.replace(/\s/g, '');
    const nilai = hurufKeAngka(
      row
        .querySelector('.text-center')
        .nextElementSibling.nextElementSibling.innerHTML.replace(/\s/g, '')
    );

    totalSks += parseInt(sks);
    totalNilai += parseInt(nilai) * parseInt(sks);
  });

  const gpa = document.querySelector('#gpa');

  let targetGPA = totalSks == 0 ? 0 : (totalNilai / totalSks).toFixed(2);
  if (targetGPA != gpa.innerHTML) {
    clearTimeout(animateGPA);
    animateGPA = setTimeout(
      setGPA,
      getSleep(targetGPA - gpa.innerHTML),
      targetGPA
    );
  }
};

const getSleep = (number) => {
  return 8 / number / (number > 1 ? Math.pow(number, 10) : 1);
};

const setGPA = (targetGPA) => {
  gpa = document.querySelector('#gpa');
  let currentGPA = gpa.innerHTML;
  let progressBar = document.querySelector('#progress-bar');
  progressBar.setAttribute(
    'stroke-dashoffset',
    (630 - currentGPA * (632 / 4)).toString()
  );
  if (targetGPA > currentGPA) {
    gpa.innerHTML = (parseFloat(currentGPA) + 0.01).toFixed(2);
    if (targetGPA > gpa.innerHTML) {
      animateGPA = setTimeout(
        setGPA,
        getSleep(targetGPA - gpa.innerHTML),
        targetGPA
      );
    }
  } else {
    gpa.innerHTML = (parseFloat(currentGPA) - 0.01).toFixed(2);
    if (targetGPA < gpa.innerHTML) {
      animateGPA = setTimeout(
        setGPA,
        getSleep(gpa.innerHTML - targetGPA),
        targetGPA
      );
    }
  }
};
