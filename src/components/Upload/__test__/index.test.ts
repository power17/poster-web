import { beforeAll, describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import { VueWrapper, flushPromises, shallowMount } from '@vue/test-utils'
import Uploader from '../index.vue'
let wrapper: VueWrapper<any>
// const mockAxios = axios
const spy = vi.spyOn(axios, 'post')
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
// const mockAxios = vi.mock('axios')
describe('upload.vue', () => {
    beforeAll(() => {
        wrapper = shallowMount(Uploader, {
            props: {
                actions: '/api/utils/upload-img',
            },
        })
    })
    it('basic layout before upload', () => {
        expect(wrapper.find('button').exists()).toBeTruthy()
        expect(wrapper.get('button span').text()).toBe('点击上传')
        expect(wrapper.get('input').isVisible()).toBeFalsy()
    })
    it('upload file process', async () => {
        spy.mockResolvedValueOnce({ data: { data: { code: '234' } } })
        spy.mockResolvedValueOnce({ data: { data: { token: '234' } } })
        spy.mockResolvedValueOnce({ data: { data: { token: '1234' } } })

        // spy.mockImplementationOnce(async () => 'jsofjd')
        // 添加fileList（上传文件）
        const fileInput = wrapper.get('input').element as HTMLInputElement
        const files = [testFile] as any
        Object.defineProperty(fileInput, 'files', {
            value: files,
            writable: false,
        })
        // 正在上传
        await wrapper.get('input').trigger('change')
        expect(spy).toHaveBeenCalledTimes(2) // ??
        expect(wrapper.get('button span').text()).toBe('正在上传')
        // 上传成功
        // expect(spy).toHaveBeenCalledTimes(3)
        await flushPromises()
        // expect(spy).toHaveBeenCalledTimes(3)
        // await asyncMock()
        expect(wrapper.get('button span').text()).toBe('上传成功')
        expect(spy).toHaveBeenCalledTimes(3)
    })
    it('upload Reject', async () => {
        spy.mockRejectedValueOnce({ error: 'error' })
        await wrapper.get('input').trigger('change')
        expect(spy).toHaveBeenCalledTimes(4)
        expect(wrapper.get('button span').text()).toBe('正在上传')
        await flushPromises()
        expect(wrapper.get('button span').text()).toBe('上传失败')
    })
})
