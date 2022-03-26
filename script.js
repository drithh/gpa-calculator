let nilai = new Array();

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
      nama: document.querySelector('#mata-kuliah').value,
      sks: sks.innerHTML.replace(/\s/g, ''),
      nilai: nilai.innerHTML.replace(/\s/g, ''),
    };

    sks.innerHTML = 'Pilih SKS';
    nilai.innerHTML = 'Pilih Nilai';

    const row = setRow(rowData);
    document.querySelector('.table-body').innerHTML += row;

    console.log(rowData);
  }
};

const deleteRow = (row) => {
  row.parentNode.parentNode.remove();
};

const setRow = (rowData) => {
  return `
    <div
      class="item-table flex h-20 px-4 place-items-center border-b-secondary border-b-[1px] border-opacity-50"
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

const setSelectValue = (el) => {
  const selectMenu = el.parentNode.parentNode;
  selectMenu.querySelector('span').innerHTML = el.innerHTML;
  toggleSelect(selectMenu);
};

const addNilai = () => {
  const wrapper = document.querySelector('.wrapper');

  const nama = wrapper.querySelector('#nama-mata-kuliah').value;

  const sks = wrapper.querySelector('#sks').value;
  const nilaiAngka = wrapper.querySelector('#nilai-angka').value;

  if (nilaiAngka >= 0 && nilaiAngka <= 4) {
    nilai.push({
      nama: nama,
      sks: sks,
      nilai: convertNilai(nilaiAngka),
    });

    console.log(nilai);
  } else {
    alert('Nilai Angka Tidak Valid');
  }
};

const convertNilai = (nilai) => {
  const nilaiHuruf = ['E', 'D', 'C', 'B', 'A'];
  return nilaiHuruf[nilai];
};

const renderNilai = () => {
  nilai.forEach((item) => {
    const list = document.createElement('li');
    list.innerHTML = `${item.nama} - ${item.sks} - ${item.nilai}`;
    document.querySelector('.list-nilai').appendChild(list);
  });
};
